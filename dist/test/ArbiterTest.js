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
var publicKey = 77;
var title = '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce532';
var routeKeys = [1];
var params = [
    hardhat_1.ethers.utils.sha256(hardhat_1.ethers.utils.toUtf8Bytes('param1')),
    hardhat_1.ethers.utils.sha256(hardhat_1.ethers.utils.toUtf8Bytes('param2'))
];
var specifier = '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce577';
var zeroAddress = '0x0000000000000000000000000000000000000000';
var piecewiseFunction = [3, 0, 0, 2, 10000];
var tokensForOwner = hardhat_1.ethers.BigNumber.from('1500000000000000000000000000000');
var tokensForSubscriber = hardhat_1.ethers.BigNumber.from('50000000000000000000000000000');
var approveTokens = hardhat_1.ethers.BigNumber.from('1000000000000000000000000000000');
var dotBound = hardhat_1.ethers.BigNumber.from('999');
describe('ZapBondage', function () {
    var zapToken;
    var dataBase;
    var bondage;
    var cost;
    var registry;
    var arbiter;
    var allocatedAmt;
    var signers;
    var coordinator;
    var owner;
    var subscriber;
    var oracle;
    var broker;
    var escrower;
    var escrower2;
    var arbiterAccount;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var zapTokenFactory, coordinatorFactory, dbFactory, registryFactory, costFactory, arbiterFactory, bondFactory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    signers = _a.sent();
                    owner = signers[0];
                    subscriber = signers[1];
                    oracle = signers[2];
                    broker = signers[3];
                    escrower = signers[4];
                    escrower2 = signers[5];
                    arbiter = signers[6];
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapToken', signers[0])];
                case 2:
                    zapTokenFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapCoordinator', signers[0])];
                case 3:
                    coordinatorFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Database', signers[0])];
                case 4:
                    dbFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Registry', signers[0])];
                case 5:
                    registryFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('CurrentCost', signers[0])];
                case 6:
                    costFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Arbiter', signers[0])];
                case 7:
                    arbiterFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Bondage', signers[0])];
                case 8:
                    bondFactory = _a.sent();
                    return [4 /*yield*/, zapTokenFactory.deploy()];
                case 9:
                    zapToken = (_a.sent());
                    return [4 /*yield*/, zapToken.deployed()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, coordinatorFactory.deploy()];
                case 11:
                    coordinator = (_a.sent());
                    return [4 /*yield*/, coordinator.deployed()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, dbFactory.deploy()];
                case 13:
                    dataBase = (_a.sent());
                    return [4 /*yield*/, costFactory.deploy(coordinator.address)];
                case 14:
                    cost = (_a.sent());
                    return [4 /*yield*/, registryFactory.deploy(coordinator.address)];
                case 15:
                    registry = (_a.sent());
                    return [4 /*yield*/, dataBase.transferOwnership(coordinator.address)];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('DATABASE', dataBase.address)];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('ARBITER', arbiter.address)];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('ZAP_TOKEN', zapToken.address)];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('REGISTRY', registry.address)];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('CURRENT_COST', cost.address)];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, bondFactory.deploy(coordinator.address)];
                case 22:
                    bondage = (_a.sent());
                    return [4 /*yield*/, coordinator.updateContract('BONDAGE', bondage.address)];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, arbiterFactory.deploy(coordinator.address)];
                case 24:
                    arbiter = (_a.sent());
                    return [4 /*yield*/, arbiter.deployed()];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('ARBITER', arbiter.address)];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateAllDependencies()];
                case 27:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    function prepareProvider(account, curveParams) {
        if (account === void 0) { account = oracle; }
        if (curveParams === void 0) { curveParams = piecewiseFunction; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, registry.connect(account).initiateProvider(publicKey, title)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, registry
                                .connect(account)
                                .initiateProviderCurve(specifier, curveParams, zeroAddress)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function prepareTokens(allocAddress) {
        if (allocAddress === void 0) { allocAddress = subscriber; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, zapToken.allocate(owner.address, tokensForOwner)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, zapToken.allocate(allocAddress.address, tokensForSubscriber)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, zapToken
                                .connect(allocAddress)
                                .approve(bondage.address, approveTokens)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    it('ARBITER_1 - initiateSubscription() - Check subscription', function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(broker)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, dotBound)];
                    case 4:
                        _a.sent();
                        console.log('initializing');
                        return [4 /*yield*/, arbiter
                                .connect(subscriber)
                                .initiateSubscription(oracle.address, specifier, params, publicKey, 10)];
                    case 5:
                        _a.sent();
                        console.log('finished');
                        return [4 /*yield*/, arbiter.getSubscription(oracle.address, subscriber.address, specifier)];
                    case 6:
                        res = _a.sent();
                        expect(res[0]).to.equal(10);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('ARBITER_2 - initiateSubscription() - Check subscription block must be more than 0', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(broker)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 1000)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, expect(arbiter
                                .connect(subscriber)
                                .initiateSubscription(oracle, specifier, params, publicKey, 0)).to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('ARBITER_3 - initiateSubscription() - Check user cannot inititate subscription for same subscriber once', function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(broker)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 1000)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, arbiter
                                .connect(subscriber)
                                .initiateSubscription(oracle.address, specifier, params, publicKey, 10)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, arbiter.getSubscription(oracle.address, subscriber.address, specifier)];
                    case 6:
                        res = _a.sent();
                        expect(res[0]).to.equal(10);
                        return [4 /*yield*/, expect(arbiter
                                .connect(subscriber)
                                .initiateSubscription(oracle, specifier, params, publicKey, 10)).to.reverted];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('ARBITER_4 - endSubscriptionProvider() - Check ending subscription', function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(broker)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 1000)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, arbiter
                                .connect(subscriber)
                                .initiateSubscription(oracle.address, specifier, params, publicKey, 10)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, arbiter
                                .connect(oracle)
                                .endSubscriptionProvider(subscriber.address, specifier)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, arbiter.getSubscription(oracle.address, subscriber.address, specifier)];
                    case 7:
                        res = _a.sent();
                        expect(res[0]).to.equal(0);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("ARBITER_5 - endSubscriptionProvider() - Check that user can't end uninitialized subscription", function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(broker)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 1000)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, expect(arbiter
                                .connect(oracle)
                                .endSubscriptionProvider(subscriber.address, specifier)).to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("ARBITER_6 - endSubscriptionSubscriber() - Check that user can't end uninitialized subscription", function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(broker)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 1000)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, expect(arbiter
                                .connect(subscriber)
                                .endSubscriptionProvider(subscriber.address, specifier)).to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('ARBITER_7 - endSubscriptionSubscriber() - Check that only subscriber can end subscription by subscriber', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(broker)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 1000)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, arbiter
                                .connect(subscriber)
                                .initiateSubscription(oracle.address, specifier, params, publicKey, 10)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, expect(arbiter.connect(subscriber).endSubscriptionSubscriber(oracle, specifier)).to.reverted];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('ARBITER_10 - endSubscriptionProvider() - Check that subscriber receives any unused dots', function () {
        return __awaiter(this, void 0, void 0, function () {
            var postEscrowBal, res, postCancelBal, postCancelProviderBal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(broker)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 100)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, arbiter
                                .connect(subscriber)
                                .initiateSubscription(oracle.address, specifier, params, publicKey, 10)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, bondage.getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 6:
                        postEscrowBal = _a.sent();
                        expect(postEscrowBal.toString()).to.equal('90');
                        return [4 /*yield*/, arbiter.getSubscription(oracle.address, subscriber.address, specifier)];
                    case 7:
                        res = _a.sent();
                        expect(res[0]).to.equal(10);
                        hardhat_1.ethers.provider.send('evm_mine', []);
                        hardhat_1.ethers.provider.send('evm_mine', []);
                        hardhat_1.ethers.provider.send('evm_mine', []);
                        hardhat_1.ethers.provider.send('evm_mine', []);
                        hardhat_1.ethers.provider.send('evm_mine', []);
                        hardhat_1.ethers.provider.send('evm_mine', []);
                        // After blocks have been mined
                        return [4 /*yield*/, arbiter
                                .connect(subscriber)
                                .endSubscriptionSubscriber(oracle.address, specifier)];
                    case 8:
                        // After blocks have been mined
                        _a.sent();
                        return [4 /*yield*/, bondage.getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 9:
                        postCancelBal = _a.sent();
                        expect(postCancelBal.toString()).to.be.equal('93');
                        return [4 /*yield*/, bondage.getBoundDots(oracle.address, oracle.address, specifier)];
                    case 10:
                        postCancelProviderBal = _a.sent();
                        expect(postCancelProviderBal.toString()).to.be.equal('7');
                        return [2 /*return*/];
                }
            });
        });
    });
});
