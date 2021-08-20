"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hardhat_1 = require("hardhat");
var ethereum_waffle_1 = require("ethereum-waffle");
var chai_1 = __importDefault(require("chai"));
chai_1.default.use(ethereum_waffle_1.solidity);
var expect = chai_1.default.expect;
var zapToken;
var faucet;
var allocatedAmt;
var signers;
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var zapTokenFactory, faucetFactory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
            case 1:
                // Test accounts
                signers = _a.sent();
                // Funds for the Faucet
                allocatedAmt = 999999999;
                return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapToken', signers[0])];
            case 2:
                zapTokenFactory = _a.sent();
                return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Faucet', signers[0])];
            case 3:
                faucetFactory = _a.sent();
                return [4 /*yield*/, zapTokenFactory.deploy()];
            case 4:
                // Deploys the ZapToken contract and creating the test Zap token
                zapToken = (_a.sent());
                return [4 /*yield*/, zapToken.deployed()];
            case 5:
                _a.sent();
                return [4 /*yield*/, faucetFactory.deploy(zapToken.address)];
            case 6:
                // Pass the address of the ZapToken contract for successful deployment
                faucet = (_a.sent());
                return [4 /*yield*/, faucet.deployed()];
            case 7:
                _a.sent();
                // Funds the Faucet the allocated amount
                // Validates that the Faucet can be funded from ZapToken.sol
                expect(zapToken.allocate(faucet.address, allocatedAmt));
                return [2 /*return*/];
        }
    });
}); });
describe('Faucet_Deployment', function () {
    it('owner() - Check if the owner is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Verify the Faucet contract address is equivalent to the first test account address
                    _a = expect;
                    return [4 /*yield*/, faucet.owner()];
                case 1:
                    // Verify the Faucet contract address is equivalent to the first test account address
                    _a.apply(void 0, [_b.sent()]).to.equal(signers[0].address);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Faucet_Transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('rate() - Check if the rate is 1 ETH for 1000 ZAP', function () { return __awaiter(void 0, void 0, void 0, function () {
            var rateObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, faucet.rate()];
                    case 1:
                        rateObj = _a.sent();
                        // Verfiy the rate is equal to 1000
                        expect(parseInt(rateObj._hex)).to.equal(1000);
                        return [2 /*return*/];
                }
            });
        }); });
        it('balanceOf() - Check if the balance is equivalent to the initial allocated amount', function () { return __awaiter(void 0, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, zapToken.balanceOf(faucet.address)];
                    case 1:
                        balance = _a.sent();
                        // Verify the balance equals to allocatedAmt
                        expect(parseInt(balance._hex)).to.equal(allocatedAmt);
                        return [2 /*return*/];
                }
            });
        }); });
        it('withdrawTok() -Check if the withdrawTok function withdraws all test ZAP from the Faucet', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, withdrawnFaucet;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Invoke the withdawnTok function
                        _a = expect;
                        return [4 /*yield*/, faucet.withdrawTok()];
                    case 1:
                        // Invoke the withdawnTok function
                        _a.apply(void 0, [_b.sent()]);
                        return [4 /*yield*/, zapToken.balanceOf(faucet.address)];
                    case 2:
                        withdrawnFaucet = _b.sent();
                        // Verify that the balance is 0
                        expect(parseInt(withdrawnFaucet._hex)).to.equal(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('buyZap() - Check if the buyZap function is able to disperse 100,000 test ZAP to signers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Verify that 100,000 test ZAP is dispersed to the signer
                        _a = expect;
                        return [4 /*yield*/, faucet.buyZap(signers[0].address, 100)];
                    case 1:
                        // Verify that 100,000 test ZAP is dispersed to the signer
                        _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('buyZap() - Check if 100,000 test ZAP is available in the signers balance', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, signerBalance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Signer is dispersed 100,000 test ZAP
                        _a = expect;
                        return [4 /*yield*/, faucet.buyZap(signers[0].address, 100)];
                    case 1:
                        // Signer is dispersed 100,000 test ZAP
                        _a.apply(void 0, [_b.sent()]);
                        return [4 /*yield*/, zapToken.balanceOf(signers[0].address)];
                    case 2:
                        signerBalance = _b.sent();
                        // Verify the signers balance is equal to 100,000
                        expect(parseInt(signerBalance._hex)).to.equal(100000);
                        return [2 /*return*/];
                }
            });
        }); });
        it('buyZap() - Check if the Faucet balance subtracts the dispersed 100,000 test ZAP', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, faucetBalance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Signer is dispersed 100,000 test ZAP
                        _a = expect;
                        return [4 /*yield*/, faucet.buyZap(signers[0].address, 100)];
                    case 1:
                        // Signer is dispersed 100,000 test ZAP
                        _a.apply(void 0, [_b.sent()]);
                        return [4 /*yield*/, zapToken.balanceOf(faucet.address)];
                    case 2:
                        faucetBalance = _b.sent();
                        // Verify the signers balance is equal to 100,000
                        expect(parseInt(faucetBalance._hex)).to.equal(allocatedAmt - 100000);
                        return [2 /*return*/];
                }
            });
        }); });
        it('withdrawTok() - Check if the withdrawEther function invokes ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Verify the function invokes
                        _a = expect;
                        return [4 /*yield*/, faucet.withdrawEther()];
                    case 1:
                        // Verify the function invokes
                        _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
