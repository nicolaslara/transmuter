mod add_new_assets;
mod corrupted_assets;
mod exit_pool;
mod has_denom;
mod join_pool;
mod transmute;
mod weight;

use std::collections::HashSet;

use cosmwasm_schema::cw_serde;
use cosmwasm_std::{ensure, Coin, Uint128, Uint64};

use crate::{asset::Asset, ContractError};

pub use transmute::AmountConstraint;

/// Minimum number of pool assets. This is required since if the
/// number of pool assets is less than 2, then the contract will
/// not function as a pool.
const MIN_POOL_ASSET_DENOMS: Uint64 = Uint64::new(2u64);

/// Maximum number of pool assets. This is required in order to
/// prevent the contract from running out of gas when iterating
const MAX_POOL_ASSET_DENOMS: Uint64 = Uint64::new(20u64);

#[cw_serde]
pub struct TransmuterPool {
    pub pool_assets: Vec<Asset>,
}

impl TransmuterPool {
    pub fn new(pool_assets: Vec<Asset>) -> Result<Self, ContractError> {
        let pool = Self { pool_assets };

        pool.ensure_no_duplicated_denom()?;
        pool.ensure_pool_asset_count_within_range()?;

        Ok(pool)
    }

    fn ensure_pool_asset_count_within_range(&self) -> Result<(), ContractError> {
        let count = Uint64::new(self.pool_assets.len() as u64);
        ensure!(
            count >= MIN_POOL_ASSET_DENOMS && count <= MAX_POOL_ASSET_DENOMS,
            ContractError::PoolAssetDenomCountOutOfRange {
                min: MIN_POOL_ASSET_DENOMS,
                max: MAX_POOL_ASSET_DENOMS,
                actual: count
            }
        );
        Ok(())
    }

    fn ensure_no_duplicated_denom(&self) -> Result<(), ContractError> {
        let mut denoms = HashSet::new();

        for asset in self.pool_assets.iter() {
            let is_new = denoms.insert(asset.denom());
            ensure!(
                is_new,
                ContractError::DuplicatedPoolAssetDenom {
                    denom: asset.denom().to_string()
                }
            );
        }

        Ok(())
    }

    pub fn get_pool_asset_by_denom(&self, denom: &'_ str) -> Result<&'_ Asset, ContractError> {
        // This could be a map, but shouldn't matter as MAX_POOL_ASSET_DENOMS is small
        self.pool_assets
            .iter()
            .find(|pool_asset| pool_asset.denom() == denom)
            .ok_or_else(|| ContractError::InvalidTransmuteDenom {
                denom: denom.to_string(),
                expected_denom: self
                    .pool_assets
                    .iter()
                    .map(|pool_asset| pool_asset.denom().to_string())
                    .collect(),
            })
    }

    pub fn pair_coins_with_normalization_factor(
        &self,
        coins: &[Coin],
    ) -> Result<Vec<(Coin, Uint128)>, ContractError> {
        // This is O(n*m) where n is the number of coins and m is the number of pool assets
        // This could be optimized but in terms of security it only matters if the callers aren't paying for gas
        // which I don't think is the case. Also pools with large number of assets would not be approved by gov.
        coins
            .iter()
            .map(|coin| {
                Ok((
                    coin.clone(),
                    self.get_pool_asset_by_denom(coin.denom.as_str())?
                        .normalization_factor(),
                ))
            })
            .collect::<Result<Vec<_>, ContractError>>()
    }

    pub fn update_normalization_factor<F>(self, update_fn: F) -> Result<Self, ContractError>
    where
        F: Fn(Uint128) -> Result<Uint128, ContractError>,
    {
        let pool_assets = self
            .pool_assets
            .into_iter()
            .map(|mut pool_asset| {
                pool_asset
                    .set_normalization_factor(update_fn(pool_asset.normalization_factor())?)?;
                Ok(pool_asset)
            })
            .collect::<Result<Vec<_>, ContractError>>()?;

        Ok(Self { pool_assets })
    }
}

#[cfg(test)]
mod tests {
    use cosmwasm_std::Uint128;

    use super::*;

    #[test]
    fn test_denom_count_within_range() {
        // 1 denom
        assert_eq!(
            TransmuterPool::new(Asset::unchecked_equal_assets(&["a"])).unwrap_err(),
            ContractError::PoolAssetDenomCountOutOfRange {
                min: MIN_POOL_ASSET_DENOMS,
                max: MAX_POOL_ASSET_DENOMS,
                actual: Uint64::new(1),
            }
        );

        // 2 denoms
        assert_eq!(
            TransmuterPool::new(Asset::unchecked_equal_assets(&["a", "b"])).unwrap(),
            TransmuterPool {
                pool_assets: Asset::unchecked_equal_assets(&["a", "b"]),
            }
        );

        // 20 denoms
        let assets: Vec<Asset> = (0..20)
            .map(|i| Asset::unchecked(Uint128::zero(), &format!("d{}", i), Uint128::one()))
            .collect();
        assert_eq!(
            TransmuterPool::new(assets.clone()).unwrap(),
            TransmuterPool {
                pool_assets: assets
            }
        );

        // 21 denoms should fail
        let assets: Vec<Asset> = (0..21)
            .map(|i| Asset::unchecked(Uint128::zero(), &format!("d{}", i), Uint128::one()))
            .collect();
        assert_eq!(
            TransmuterPool::new(assets).unwrap_err(),
            ContractError::PoolAssetDenomCountOutOfRange {
                min: MIN_POOL_ASSET_DENOMS,
                max: MAX_POOL_ASSET_DENOMS,
                actual: Uint64::new(21),
            }
        );
    }

    #[test]
    fn test_duplicated_denom() {
        let assets = Asset::unchecked_equal_assets(&["a", "a"]);
        assert_eq!(
            TransmuterPool::new(assets).unwrap_err(),
            ContractError::DuplicatedPoolAssetDenom {
                denom: "a".to_string(),
            }
        );
    }
}
