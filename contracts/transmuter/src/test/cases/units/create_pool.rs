use crate::{
    asset::AssetConfig,
    contract::{
        GetShareDenomResponse, GetTotalPoolLiquidityResponse, GetTotalSharesResponse,
        InstantiateMsg, IsActiveResponse, QueryMsg,
    },
};
use cosmwasm_std::{Coin, Uint128};
use osmosis_test_tube::OsmosisTestApp;

use crate::test::test_env::TestEnvBuilder;

#[test]
fn test_create_pool() {
    let app = OsmosisTestApp::new();

    // create denom
    app.init_account(&[Coin::new(1, "denom1"), Coin::new(1, "denom2")])
        .unwrap();

    let t = TestEnvBuilder::new()
        .with_instantiate_msg(InstantiateMsg {
            pool_asset_configs: vec![
                AssetConfig::from_denom_str("denom1"),
                AssetConfig::from_denom_str("denom2"),
            ],
            admin: None,
            alloyed_asset_subdenom: "denomx".to_string(),
            moderator: None,
        })
        .build(&app);

    // get share denom
    let GetShareDenomResponse { share_denom } =
        t.contract.query(&QueryMsg::GetShareDenom {}).unwrap();

    assert_eq!(
        share_denom,
        format!("factory/{}/alloyed/denomx", t.contract.contract_addr)
    );

    // get pool assets
    let GetTotalPoolLiquidityResponse {
        total_pool_liquidity,
    } = t
        .contract
        .query(&QueryMsg::GetTotalPoolLiquidity {})
        .unwrap();

    assert_eq!(
        total_pool_liquidity,
        vec![
            Coin::new(0, "denom1".to_string()),
            Coin::new(0, "denom2".to_string())
        ]
    );

    // get total shares
    let GetTotalSharesResponse { total_shares } =
        t.contract.query(&QueryMsg::GetTotalShares {}).unwrap();

    assert_eq!(total_shares, Uint128::zero());

    // get active status
    let IsActiveResponse { is_active } = t.contract.query(&QueryMsg::IsActive {}).unwrap();
    assert!(is_active);
}
