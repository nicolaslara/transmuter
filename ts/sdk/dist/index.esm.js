/*!
 * transmuter-sdk v 0.0.1
 * (c) Supanat Potiwarakorn <supanat.ptk@gmail.com>
 * Released under the MIT OR Apache-2.0 License.
 */

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.24.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

var _0 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.24.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/
var TransmuterQueryClient = /** @class */ (function () {
    function TransmuterQueryClient(client, contractAddress) {
        var _this = this;
        this.getShares = function (_a) {
            var address = _a.address;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                            get_shares: {
                                address: address
                            }
                        })];
                });
            });
        };
        this.getShareDenom = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                        get_share_denom: {}
                    })];
            });
        }); };
        this.getSwapFee = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                        get_swap_fee: {}
                    })];
            });
        }); };
        this.isActive = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                        is_active: {}
                    })];
            });
        }); };
        this.getTotalShares = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                        get_total_shares: {}
                    })];
            });
        }); };
        this.getTotalPoolLiquidity = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                        get_total_pool_liquidity: {}
                    })];
            });
        }); };
        this.spotPrice = function (_a) {
            var baseAssetDenom = _a.baseAssetDenom, quoteAssetDenom = _a.quoteAssetDenom;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                            spot_price: {
                                base_asset_denom: baseAssetDenom,
                                quote_asset_denom: quoteAssetDenom
                            }
                        })];
                });
            });
        };
        this.calcOutAmtGivenIn = function (_a) {
            var swapFee = _a.swapFee, tokenIn = _a.tokenIn, tokenOutDenom = _a.tokenOutDenom;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                            calc_out_amt_given_in: {
                                swap_fee: swapFee,
                                token_in: tokenIn,
                                token_out_denom: tokenOutDenom
                            }
                        })];
                });
            });
        };
        this.calcInAmtGivenOut = function (_a) {
            var swapFee = _a.swapFee, tokenInDenom = _a.tokenInDenom, tokenOut = _a.tokenOut;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                            calc_in_amt_given_out: {
                                swap_fee: swapFee,
                                token_in_denom: tokenInDenom,
                                token_out: tokenOut
                            }
                        })];
                });
            });
        };
        this.getAdmin = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                        get_admin: {}
                    })];
            });
        }); };
        this.getAdminCandidate = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.queryContractSmart(this.contractAddress, {
                        get_admin_candidate: {}
                    })];
            });
        }); };
        this.client = client;
        this.contractAddress = contractAddress;
        this.getShares = this.getShares.bind(this);
        this.getShareDenom = this.getShareDenom.bind(this);
        this.getSwapFee = this.getSwapFee.bind(this);
        this.isActive = this.isActive.bind(this);
        this.getTotalShares = this.getTotalShares.bind(this);
        this.getTotalPoolLiquidity = this.getTotalPoolLiquidity.bind(this);
        this.spotPrice = this.spotPrice.bind(this);
        this.calcOutAmtGivenIn = this.calcOutAmtGivenIn.bind(this);
        this.calcInAmtGivenOut = this.calcInAmtGivenOut.bind(this);
        this.getAdmin = this.getAdmin.bind(this);
        this.getAdminCandidate = this.getAdminCandidate.bind(this);
    }
    return TransmuterQueryClient;
}());
var TransmuterClient = /** @class */ (function (_super) {
    __extends(TransmuterClient, _super);
    function TransmuterClient(client, sender, contractAddress) {
        var _this = _super.call(this, client, contractAddress) || this;
        _this.setActiveStatus = function (_a, fee, memo, funds) {
            var active = _a.active;
            if (fee === void 0) { fee = "auto"; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.client.execute(this.sender, this.contractAddress, {
                                set_active_status: {
                                    active: active
                                }
                            }, fee, memo, funds)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        _this.joinPool = function (fee, memo, funds) {
            if (fee === void 0) { fee = "auto"; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.execute(this.sender, this.contractAddress, {
                                join_pool: {}
                            }, fee, memo, funds)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.exitPool = function (_a, fee, memo, funds) {
            var tokensOut = _a.tokensOut;
            if (fee === void 0) { fee = "auto"; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.client.execute(this.sender, this.contractAddress, {
                                exit_pool: {
                                    tokens_out: tokensOut
                                }
                            }, fee, memo, funds)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        _this.transferAdmin = function (_a, fee, memo, funds) {
            var candidate = _a.candidate;
            if (fee === void 0) { fee = "auto"; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.client.execute(this.sender, this.contractAddress, {
                                transfer_admin: {
                                    candidate: candidate
                                }
                            }, fee, memo, funds)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        _this.claimAdmin = function (fee, memo, funds) {
            if (fee === void 0) { fee = "auto"; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.execute(this.sender, this.contractAddress, {
                                claim_admin: {}
                            }, fee, memo, funds)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.client = client;
        _this.sender = sender;
        _this.contractAddress = contractAddress;
        _this.setActiveStatus = _this.setActiveStatus.bind(_this);
        _this.joinPool = _this.joinPool.bind(_this);
        _this.exitPool = _this.exitPool.bind(_this);
        _this.transferAdmin = _this.transferAdmin.bind(_this);
        _this.claimAdmin = _this.claimAdmin.bind(_this);
        return _this;
    }
    return TransmuterClient;
}(TransmuterQueryClient));

var _1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    TransmuterQueryClient: TransmuterQueryClient,
    TransmuterClient: TransmuterClient
});

/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.24.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/
var contracts;
(function (contracts) {
    contracts.Transmuter = __assign(__assign({}, _0), _1);
})(contracts || (contracts = {}));

export { contracts };
//# sourceMappingURL=index.esm.js.map
