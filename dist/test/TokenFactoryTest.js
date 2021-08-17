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
var title2 = '0x077a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce532';
var routeKeys = [1];
var params = ['param1', 'param2'];
var specifier = '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce577';
var zeroAddress = '0x0000000000000000000000000000000000000000';
var piecewiseFunction = [3, 0, 0, 2, 10000];
var tokensForOwner = hardhat_1.ethers.BigNumber.from('1500000000000000000000000000000');
var tokensForSubscriber = hardhat_1.ethers.BigNumber.from('50000000000000000000000000000');
var approveTokens = hardhat_1.ethers.BigNumber.from('1000000000000000000000000000000');
var dotBound = hardhat_1.ethers.BigNumber.from('999');
var structurizeCurve = function (parts) {
    var pieces = Array();
    var index = 0;
    var start = 1;
    while (index < parts.length) {
        var length_1 = parts[index];
        var base = index + 1;
        var terms = parts.slice(base, base + length_1);
        var end = parts[base + length_1];
        pieces.push({
            terms: terms,
            start: start,
            end: end
        });
        index = base + length_1 + 1;
        start = end;
    }
    return pieces;
};
var calcNextDotCost = function (structurizedCurve, total) {
    if (total < 0) {
        return 0;
    }
    for (var i = 0; i < structurizedCurve.length; i++) {
        if (structurizedCurve[i].start <= total &&
            total <= structurizedCurve[i].end) {
            return _calculatePolynomial(structurizedCurve[i].terms, total);
        }
    }
    return 0;
};
var calcDotsCost = function (structurizedCurve, numDots) {
    var cost = 0;
    for (var i = 1; i <= numDots; i++) {
        cost += calcNextDotCost(structurizedCurve, i);
    }
    return cost;
};
function _calculatePolynomial(terms, x) {
    var sum = 0;
    for (var i = 0; i < terms.length; i++) {
        sum += terms[i] * Math.pow(x, i);
    }
    return sum;
}
describe('ZapBondage', function () {
    var zapToken;
    var tokenFactory;
    var dataBase;
    var bondage;
    var cost;
    var dotFactory;
    var factoryToken;
    var registry;
    var factoryTokne;
    var allocatedAmt;
    var signers;
    var coordinator;
    var owner;
    var subscriber;
    var oracle;
    var broker;
    var escrower;
    var escrower2;
    var arbiter;
    var dotTokenFactory;
    //let dotFactoryFactory:DotFactoryFactory;
    var dotFactoryFactoryInstance;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var zapTokenFactory, genericTokenFactory, coordinatorFactory, dbFactory, registryFactory, costFactory, dotFactoryFactory, bondFactory;
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
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('TokenDotFactory', signers[0])];
                case 2:
                    dotTokenFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('FactoryToken', signers[0])];
                case 3:
                    factoryToken = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapToken', signers[0])];
                case 4:
                    zapTokenFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('TokenFactory', signers[0])];
                case 5:
                    genericTokenFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapCoordinator', signers[0])];
                case 6:
                    coordinatorFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Database', signers[0])];
                case 7:
                    dbFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Registry', signers[0])];
                case 8:
                    registryFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('CurrentCost', signers[0])];
                case 9:
                    costFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('DotFactoryFactory', signers[0])];
                case 10:
                    dotFactoryFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Bondage', signers[0])];
                case 11:
                    bondFactory = _a.sent();
                    return [4 /*yield*/, genericTokenFactory.deploy()];
                case 12:
                    tokenFactory = (_a.sent());
                    return [4 /*yield*/, tokenFactory.deployed()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, zapTokenFactory.deploy()];
                case 14:
                    zapToken = (_a.sent());
                    return [4 /*yield*/, zapToken.deployed()];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, coordinatorFactory.deploy()];
                case 16:
                    coordinator = (_a.sent());
                    return [4 /*yield*/, coordinator.deployed()];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, dbFactory.deploy()];
                case 18:
                    dataBase = (_a.sent());
                    return [4 /*yield*/, costFactory.deploy(coordinator.address)];
                case 19:
                    cost = (_a.sent());
                    return [4 /*yield*/, registryFactory.deploy(coordinator.address)];
                case 20:
                    registry = (_a.sent());
                    return [4 /*yield*/, dotFactoryFactory.deploy(coordinator.address, tokenFactory.address)];
                case 21:
                    dotFactoryFactoryInstance = (_a.sent());
                    return [4 /*yield*/, dotFactoryFactoryInstance.deployed()];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, dataBase.transferOwnership(coordinator.address)];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('DATABASE', dataBase.address)];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('ARBITER', arbiter.address)];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('ZAP_TOKEN', zapToken.address)];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('REGISTRY', registry.address)];
                case 27:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('CURRENT_COST', cost.address)];
                case 28:
                    _a.sent();
                    return [4 /*yield*/, bondFactory.deploy(coordinator.address)];
                case 29:
                    bondage = (_a.sent());
                    return [4 /*yield*/, coordinator.updateContract('BONDAGE', bondage.address)];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateAllDependencies()];
                case 31:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    function prepareProvider(account, curveParams, bondBroker) {
        if (account === void 0) { account = owner; }
        if (curveParams === void 0) { curveParams = piecewiseFunction; }
        if (bondBroker === void 0) { bondBroker = zeroAddress; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, registry.connect(account).initiateProvider(publicKey, title)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, registry
                                .connect(account)
                                .initiateProviderCurve(specifier, curveParams, bondBroker)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function findEvent(logs, eventName) {
        for (var i = 0; i < logs.length; i++) {
            if (logs[i].event === eventName) {
                return logs[i];
            }
        }
        return null;
    }
    it('TOKEN_DOT_FACTORY_1 - constructor() - Check token dot factory initialization', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(tokenFactory.address);
                        return [4 /*yield*/, dotTokenFactory.deploy(coordinator.address, tokenFactory.address, publicKey, title)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('TOKEN_DOT_FACTORY_2 - newToken() - Check new token creation', function () {
        return __awaiter(this, void 0, void 0, function () {
            var factory, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dotTokenFactory.deploy(coordinator.address, tokenFactory.address, publicKey, title)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, factory.deployed()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, factory.newToken('t1', 'tkn')];
                    case 3:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 4:
                        tx = _a.sent();
                        return [4 /*yield*/, expect(hardhat_1.ethers.utils.getAddress(hardhat_1.ethers.utils.hexStripZeros(tx.logs[0].topics[2]))).to.equal(factory.address)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('TOKEN_DOT_FACTORY_3 - initializeCurve() - Check curve initialization', function () {
        return __awaiter(this, void 0, void 0, function () {
            var factory, tx, dotTokenCreatedEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dotTokenFactory.deploy(coordinator.address, tokenFactory.address, publicKey, title)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, factory.initializeCurve(specifier, title, piecewiseFunction)];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 3:
                        tx = _a.sent();
                        console.log(tx);
                        dotTokenCreatedEvent = findEvent(tx.events, 'DotTokenCreated');
                        console.log(dotTokenCreatedEvent);
                        return [4 /*yield*/, expect(dotTokenCreatedEvent).to.be.not.equal(null)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('TOKEN_DOT_FACTORY_4 - initializeCurve() - Exception thrown if curve specifier already exists', function () {
        return __awaiter(this, void 0, void 0, function () {
            var factory, tx, dotTokenCreatedEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dotTokenFactory.deploy(coordinator.address, tokenFactory.address, publicKey, title)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, factory.initializeCurve(specifier, title, piecewiseFunction)];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 3:
                        tx = _a.sent();
                        console.log(tx);
                        dotTokenCreatedEvent = findEvent(tx.events, 'DotTokenCreated');
                        return [4 /*yield*/, expect(dotTokenCreatedEvent).to.be.not.equal(null)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, expect(factory.initializeCurve(specifier, title, piecewiseFunction))
                                .to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('TOKEN_DOT_FACTORY_5 - bond() - Check bonding', function () {
        return __awaiter(this, void 0, void 0, function () {
            var factory, reserveTokenAddr, reserveToken, subBalance, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, dotTokenFactory.deploy(coordinator.address, tokenFactory.address, publicKey, title)];
                    case 1:
                        factory = _b.sent();
                        return [4 /*yield*/, factory.initializeCurve(specifier, title2, piecewiseFunction)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, factory.reserveToken()];
                    case 3:
                        reserveTokenAddr = _b.sent();
                        return [4 /*yield*/, zapToken.attach(reserveTokenAddr)];
                    case 4:
                        reserveToken = _b.sent();
                        return [4 /*yield*/, reserveToken.allocate(subscriber.address, 10000)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, reserveToken.connect(subscriber).approve(factory.address, 10000)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, factory.connect(subscriber).bond(specifier, 1)];
                    case 7:
                        _b.sent();
                        _a = parseInt;
                        return [4 /*yield*/, reserveToken.balanceOf(subscriber.address)];
                    case 8:
                        subBalance = _a.apply(void 0, [(_b.sent()).toString()]);
                        console.log(subBalance);
                        return [4 /*yield*/, expect(subBalance).to.be.not.equal(10000)];
                    case 9:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('TOKEN_DOT_FACTORY_6 - bond() - Check that user can not bond without tokens', function () {
        return __awaiter(this, void 0, void 0, function () {
            var factory, reserveTokenAddr, reserveToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dotTokenFactory.deploy(coordinator.address, tokenFactory.address, publicKey, title)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, factory.initializeCurve(specifier, title2, piecewiseFunction)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, factory.reserveToken()];
                    case 3:
                        reserveTokenAddr = _a.sent();
                        return [4 /*yield*/, zapToken.attach(reserveTokenAddr)];
                    case 4:
                        reserveToken = _a.sent();
                        // await reserveToken.allocate(subscriber, 10000);
                        return [4 /*yield*/, reserveToken.connect(subscriber).approve(factory.address, 10000)];
                    case 5:
                        // await reserveToken.allocate(subscriber, 10000);
                        _a.sent();
                        return [4 /*yield*/, expect(factory.connect(subscriber).bond(specifier, 1)).to.reverted];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('TOKEN_DOT_FACTORY_7 - unbond() - Check unbonding', function () {
        return __awaiter(this, void 0, void 0, function () {
            var factory, reserveTokenAddr, reserveToken, curveTokenAddr, curveToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dotTokenFactory.deploy(coordinator.address, tokenFactory.address, publicKey, title)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, factory.initializeCurve(specifier, title2, piecewiseFunction)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, factory.reserveToken()];
                    case 3:
                        reserveTokenAddr = _a.sent();
                        return [4 /*yield*/, zapToken.attach(reserveTokenAddr)];
                    case 4:
                        reserveToken = _a.sent();
                        return [4 /*yield*/, reserveToken.allocate(subscriber.address, 10000)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, reserveToken.connect(subscriber).approve(factory.address, 10000)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, factory.connect(subscriber).bond(specifier, 1)];
                    case 7:
                        _a.sent();
                        console.log('finish bond');
                        return [4 /*yield*/, factory.getTokenAddress(specifier)];
                    case 8:
                        curveTokenAddr = _a.sent();
                        return [4 /*yield*/, factoryToken.attach(curveTokenAddr)];
                    case 9:
                        curveToken = _a.sent();
                        return [4 /*yield*/, curveToken.connect(subscriber).approve(factory.address, 1)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, factory.connect(subscriber).unbond(specifier, 1)];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('TOKEN_DOT_FACTORY_8 - unbond() - Check that user can not unbond more than have', function () {
        return __awaiter(this, void 0, void 0, function () {
            var factory, reserveTokenAddr, reserveToken, curveTokenAddr, curveToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dotTokenFactory.deploy(coordinator.address, tokenFactory.address, publicKey, title)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, factory.initializeCurve(specifier, title2, piecewiseFunction)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, factory.reserveToken()];
                    case 3:
                        reserveTokenAddr = _a.sent();
                        return [4 /*yield*/, zapToken.attach(reserveTokenAddr)];
                    case 4:
                        reserveToken = _a.sent();
                        return [4 /*yield*/, reserveToken.allocate(subscriber.address, 10000)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, reserveToken.connect(subscriber).approve(factory.address, 10000)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, factory.connect(subscriber).bond(specifier, 1)];
                    case 7:
                        _a.sent();
                        console.log('finish bond');
                        return [4 /*yield*/, factory.getTokenAddress(specifier)];
                    case 8:
                        curveTokenAddr = _a.sent();
                        return [4 /*yield*/, factoryToken.attach(curveTokenAddr)];
                    case 9:
                        curveToken = _a.sent();
                        return [4 /*yield*/, curveToken.connect(subscriber).approve(factory.address, 1)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, expect(factory.connect(subscriber).unbond(specifier, 100)).to
                                .reverted];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('TOKEN_DOT_FACTORY_9 - getTokenAddress() - Check curve token address', function () {
        return __awaiter(this, void 0, void 0, function () {
            var factory, curveTokenAddr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dotTokenFactory.deploy(coordinator.address, tokenFactory.address, publicKey, title)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, factory.initializeCurve(specifier, title2, piecewiseFunction)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, factory.getTokenAddress(specifier)];
                    case 3:
                        curveTokenAddr = _a.sent();
                        return [4 /*yield*/, expect(curveTokenAddr).to.not.equal(zeroAddress)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('TOKEN_DOT_FACTORY_10 -deploy through dot factory Factory ', function () {
        return __awaiter(this, void 0, void 0, function () {
            var factory, factories, Instantiated, curveTokenAddr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dotFactoryFactoryInstance.deployFactory(publicKey, title)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, dotFactoryFactoryInstance.getFactories()];
                    case 2:
                        factories = _a.sent();
                        return [4 /*yield*/, dotTokenFactory.attach(factories[0])];
                    case 3:
                        Instantiated = _a.sent();
                        return [4 /*yield*/, Instantiated.initializeCurve(specifier, title2, piecewiseFunction)
                            //await factory.initializeCurve(specifier, title2, piecewiseFunction);
                        ];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, Instantiated.getTokenAddress(specifier)];
                    case 5:
                        curveTokenAddr = _a.sent();
                        return [4 /*yield*/, expect(curveTokenAddr).to.not.equal(zeroAddress)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
