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
Object.defineProperty(exports, "__esModule", { value: true });
var hardhat_1 = require("hardhat");
var expect = require('chai').expect;
// ABI
// ADDRESS
var RFTDotFactory;
var signers;
var subscriber;
var coordinator;
var coordinatorFactory;
//let factory : TokenFactory;
var RFTTokenFactory;
var RFTDotFactoryFactory;
var RFTDotFactoryInstance;
var RFTDotFactoryFactoryInstance;
var zapToken;
var dataBase;
var bondage;
var cost;
var rftDotFactory;
var factoryToken;
var registry;
var zeroAddress = '0x0000000000000000000000000000000000000000';
var title = '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce532';
var title2 = '0x077a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce532';
var specifier = '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce577';
var piecewiseFunction = [3, 0, 0, 2, 10000];
describe('Testing', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var coordinatorFactory, zapTokenFactory, RFTFactory, registryFactory, costFactory, dotFactoryFactory, dbFactory, bondFactory, rftDotFactoryFactory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    signers = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapCoordinator', signers[0])];
                case 2:
                    coordinatorFactory = _a.sent();
                    return [4 /*yield*/, coordinatorFactory.deploy()];
                case 3:
                    // deploys coordinator contract
                    coordinator = (_a.sent());
                    return [4 /*yield*/, coordinator.deployed()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapToken', signers[0])];
                case 5:
                    zapTokenFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('RFTTokenFactory', signers[0])];
                case 6:
                    RFTFactory = _a.sent();
                    return [4 /*yield*/, RFTFactory.deploy()];
                case 7:
                    RFTTokenFactory = (_a.sent());
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Registry', signers[0])];
                case 8:
                    registryFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('CurrentCost', signers[0])];
                case 9:
                    costFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('DotFactoryFactory', signers[0])];
                case 10:
                    dotFactoryFactory = _a.sent();
                    subscriber = signers[1];
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ERC1155', signers[0])];
                case 11:
                    factoryToken = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Database', signers[0])];
                case 12:
                    dbFactory = _a.sent();
                    return [4 /*yield*/, dbFactory.deploy()];
                case 13:
                    dataBase = (_a.sent());
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Bondage', signers[0])];
                case 14:
                    bondFactory = _a.sent();
                    return [4 /*yield*/, zapTokenFactory.deploy()];
                case 15:
                    zapToken = (_a.sent());
                    return [4 /*yield*/, costFactory.deploy(coordinator.address)];
                case 16:
                    cost = (_a.sent());
                    return [4 /*yield*/, registryFactory.deploy(coordinator.address)];
                case 17:
                    registry = (_a.sent());
                    return [4 /*yield*/, dataBase.transferOwnership(coordinator.address)];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('DATABASE', dataBase.address)];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('ZAP_TOKEN', zapToken.address)];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('REGISTRY', registry.address)];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('CURRENT_COST', cost.address)];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, bondFactory.deploy(coordinator.address)];
                case 23:
                    bondage = (_a.sent());
                    return [4 /*yield*/, coordinator.updateContract('BONDAGE', bondage.address)];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateAllDependencies()];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, zapToken.deployed()];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('RFTDotFactoryFactory', signers[0])];
                case 27:
                    rftDotFactoryFactory = (_a.sent());
                    return [4 /*yield*/, rftDotFactoryFactory.deploy(coordinator.address, RFTTokenFactory.address)];
                case 28:
                    // deploys dotfactoryfactory
                    RFTDotFactoryFactoryInstance = (_a.sent());
                    // RFTDotFactoryFactoryInstance = (await rftDotFactoryFactory.deploy(coordinator.address, RFTTokenFactory.address)) as RftDotFactoryFactory;
                    return [4 /*yield*/, RFTDotFactoryFactoryInstance.deployed()];
                case 29:
                    // RFTDotFactoryFactoryInstance = (await rftDotFactoryFactory.deploy(coordinator.address, RFTTokenFactory.address)) as RftDotFactoryFactory;
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('RFTDotFactory', signers[0])];
                case 30:
                    rftDotFactory = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get accounts', function () {
    });
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
                        console.log(rftDotFactory.address);
                        return [4 /*yield*/, rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address, 77, title, 2)];
                    case 1:
                        RFTDotFactoryInstance = _a.sent();
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
                    case 0: return [4 /*yield*/, rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address, 77, title, 2)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, factory.deployed()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, factory.newToken('t1')];
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
                    case 0: return [4 /*yield*/, rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address, 77, title, 2)];
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
                    case 0: return [4 /*yield*/, rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address, 77, title, 2)];
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
                    case 0: return [4 /*yield*/, rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address, 77, title, 2)];
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
                    case 0: return [4 /*yield*/, rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address, 77, title, 2)];
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
                    case 0: return [4 /*yield*/, rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address, 77, title, 2)];
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
                        // await curveToken.connect(subscriber).approve(factory.address, 1);
                        return [4 /*yield*/, factory.connect(subscriber).unbond(specifier, 1)];
                    case 10:
                        // await curveToken.connect(subscriber).approve(factory.address, 1);
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
                    case 0: return [4 /*yield*/, rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address, 77, title, 2)];
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
                        // await curveToken.connect(subscriber).approve(factory.address, 1);
                        return [4 /*yield*/, expect(factory.connect(subscriber).unbond(specifier, 100)).to
                                .reverted];
                    case 10:
                        // await curveToken.connect(subscriber).approve(factory.address, 1);
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
                    case 0: return [4 /*yield*/, rftDotFactory.deploy(coordinator.address, RFTTokenFactory.address, 77, title, 2)];
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
                    case 0: return [4 /*yield*/, RFTDotFactoryFactoryInstance.deployFactory(77, title, 2)];
                    case 1:
                        factory = _a.sent();
                        return [4 /*yield*/, RFTDotFactoryFactoryInstance.getFactories()];
                    case 2:
                        factories = _a.sent();
                        return [4 /*yield*/, rftDotFactory.attach(factories[0])];
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
