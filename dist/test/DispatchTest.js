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
var OffChainClient_json_1 = __importDefault(require("../artifacts/contracts/lib/platform/OffChainClient.sol/OffChainClient.json"));
chai_1.default.use(ethereum_waffle_1.solidity);
var expect = chai_1.default.expect;
var eventSigs = [
    'RecievedQuery(string,bytes32,bytes32[])',
    'TEST(uint,bytes32,string)',
    'Incoming(uint256,address,address,string,bytes32,bytes32[],bool)',
    'FulfillQuery(address,address,bytes32)',
    'OffchainResponse(uint256,address,address,bytes32[])',
    'OffchainResponseInt(uint256,address,address,int[])',
    'OffchainResult1(uint256,address,address,string)',
    'OffchainResult2(uint256,address,address,string,string)',
    'OffchainResult3(uint256,address,address,string,string,string)',
    'OffchainResult4(uint256,address,address,string,string,string,string)',
    'CanceledRequest(uint256,address,address)',
    'RevertCancelation(uint256,address,address)',
    'MadeQuery(address,string,uint256)',
    'Result1(uint256,string)',
    'Result1(uint256,bytes32)',
    'Result2(uint256,string,string)',
    'Escrowed(address,address,bytes32,uint256)'
];
function getEventHashSigs() {
    var hashes = eventSigs.map(function (item) {
        return hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.toUtf8Bytes(item));
    });
    // console.log(hashes)
    return hashes;
}
var title = '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce532';
var routeKeys = [1];
var params = [
    hardhat_1.ethers.utils.sha256(hardhat_1.ethers.utils.toUtf8Bytes('param1')),
    hardhat_1.ethers.utils.sha256(hardhat_1.ethers.utils.toUtf8Bytes('param2'))
];
var specifier = '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce577';
var zeroAddress = '0x0000000000000000000000000000000000000000';
var piecewiseFunction = [3, 0, 0, 2, 1000000000];
var tokensForOwner = hardhat_1.ethers.BigNumber.from('1500000000000000000000000000000');
var tokensForSubscriber = hardhat_1.ethers.BigNumber.from('50000000000000000000000000000');
var approveTokens = hardhat_1.ethers.BigNumber.from('1000000000000000000000000000000');
var dotBound = hardhat_1.ethers.BigNumber.from('999');
//const Oracle = artifacts.require("TestProvider");
//const Subscriber = artifacts.require("TestClient");
var spec1 = hardhat_1.ethers.utils.sha256(hardhat_1.ethers.utils.toUtf8Bytes('Hello?'));
var spec2 = hardhat_1.ethers.utils.sha256(hardhat_1.ethers.utils.toUtf8Bytes('Reverse'));
var spec3 = hardhat_1.ethers.utils.sha256(hardhat_1.ethers.utils.toUtf8Bytes('Add'));
var spec4 = hardhat_1.ethers.utils.sha256(hardhat_1.ethers.utils.toUtf8Bytes('Double'));
var badSpec = hardhat_1.ethers.utils.sha256(hardhat_1.ethers.utils.toUtf8Bytes('Bad Endpoint'));
var publicKey = 10001;
var extInfo = [111, 222, 333];
var query = 'query';
describe('ZapBondage', function () {
    var zapToken;
    var dataBase;
    var bondage;
    var cost;
    var registry;
    var coordinator;
    var oracle;
    var subscriber;
    var dispatch;
    var offchainsubscriber;
    var allocatedAmt;
    var signers;
    var subscriberAccount;
    var owner;
    var OracleSigner;
    var broker;
    var escrower;
    var escrower2;
    var arbiter;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var zapTokenFactory, coordinatorFactory, offchainFactory, dbFactory, registryFactory, costFactory, dispatchFactory, subscriberFactory, oracleFactory, bondFactory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    signers = _a.sent();
                    owner = signers[0];
                    subscriberAccount = signers[1];
                    OracleSigner = signers[2];
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
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('OffChainClient', signers[0])];
                case 4:
                    offchainFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Database', signers[0])];
                case 5:
                    dbFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Registry', signers[0])];
                case 6:
                    registryFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('CurrentCost', signers[0])];
                case 7:
                    costFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Dispatch', signers[0])];
                case 8:
                    dispatchFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('TestClient', signers[0])];
                case 9:
                    subscriberFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('TestProvider', OracleSigner)];
                case 10:
                    oracleFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Bondage', signers[0])];
                case 11:
                    bondFactory = _a.sent();
                    return [4 /*yield*/, zapTokenFactory.deploy()];
                case 12:
                    zapToken = (_a.sent());
                    return [4 /*yield*/, zapToken.deployed()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, coordinatorFactory.deploy()];
                case 14:
                    coordinator = (_a.sent());
                    return [4 /*yield*/, coordinator.deployed()];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, dbFactory.deploy()];
                case 16:
                    dataBase = (_a.sent());
                    return [4 /*yield*/, costFactory.deploy(coordinator.address)];
                case 17:
                    cost = (_a.sent());
                    return [4 /*yield*/, registryFactory.deploy(coordinator.address)];
                case 18:
                    registry = (_a.sent());
                    return [4 /*yield*/, dataBase.transferOwnership(coordinator.address)];
                case 19:
                    _a.sent();
                    // console.log("adding ImmutableContracts")
                    return [4 /*yield*/, coordinator.addImmutableContract('DATABASE', dataBase.address)];
                case 20:
                    // console.log("adding ImmutableContracts")
                    _a.sent();
                    return [4 /*yield*/, dispatchFactory.deploy(coordinator.address)];
                case 21: return [4 /*yield*/, _a.sent()];
                case 22:
                    dispatch = (_a.sent());
                    return [4 /*yield*/, coordinator.addImmutableContract('ARBITER', arbiter.address)];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('ZAP_TOKEN', zapToken.address)];
                case 24:
                    _a.sent();
                    // console.log("updating Contracts")
                    return [4 /*yield*/, coordinator.updateContract('REGISTRY', registry.address)];
                case 25:
                    // console.log("updating Contracts")
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('CURRENT_COST', cost.address)];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, bondFactory.deploy(coordinator.address)];
                case 27:
                    bondage = (_a.sent());
                    return [4 /*yield*/, coordinator.updateContract('BONDAGE', bondage.address)];
                case 28:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('DISPATCH', dispatch.address)];
                case 29:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateAllDependencies()];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, subscriberFactory.deploy(zapToken.address, dispatch.address, bondage.address, registry.address)];
                case 31:
                    subscriber = (_a.sent());
                    return [4 /*yield*/, offchainFactory.deploy(zapToken.address, dispatch.address, bondage.address, registry.address)];
                case 32:
                    offchainsubscriber = (_a.sent());
                    return [4 /*yield*/, subscriber.deployed()];
                case 33:
                    _a.sent();
                    return [4 /*yield*/, offchainsubscriber.deployed()];
                case 34:
                    _a.sent();
                    return [4 /*yield*/, oracleFactory.deploy(registry.address, false)];
                case 35: return [4 /*yield*/, _a.sent()];
                case 36:
                    oracle = (_a.sent());
                    return [4 /*yield*/, oracle.deployed()];
                case 37:
                    oracle = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    function prepareTokens(allocAddress) {
        if (allocAddress === void 0) { allocAddress = subscriberAccount; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log("allocate")
                    return [4 /*yield*/, zapToken.allocate(owner.address, tokensForOwner)];
                    case 1:
                        // console.log("allocate")
                        _a.sent();
                        // console.log("allocate")
                        return [4 /*yield*/, zapToken.allocate(allocAddress.address, tokensForSubscriber)];
                    case 2:
                        // console.log("allocate")
                        _a.sent();
                        // console.log("approve")
                        return [4 /*yield*/, zapToken
                                .connect(allocAddress)
                                .approve(bondage.address, approveTokens)];
                    case 3:
                        // console.log("approve")
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function prepareProvider(account, curveParams) {
        if (account === void 0) { account = owner; }
        if (curveParams === void 0) { curveParams = piecewiseFunction; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //   console.log("init provider")
                    return [4 /*yield*/, registry.connect(account).initiateProvider(publicKey, title)];
                    case 1:
                        //   console.log("init provider")
                        _a.sent();
                        //console.log("init curve")
                        return [4 /*yield*/, registry
                                .connect(account)
                                .initiateProviderCurve(spec1, curveParams, zeroAddress)];
                    case 2:
                        //console.log("init curve")
                        _a.sent();
                        return [4 /*yield*/, registry
                                .connect(account)
                                .initiateProviderCurve(spec2, curveParams, zeroAddress)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, registry
                                .connect(account)
                                .initiateProviderCurve(spec3, curveParams, zeroAddress)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, registry
                                .connect(account)
                                .initiateProviderCurve(spec4, curveParams, zeroAddress)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function validateEvents(events, expected) {
        events.forEach(function (event, key) {
            //console.log(event.topics[0])
            var hashes = getEventHashSigs();
            //console.log(key)
            var index = hashes.findIndex(function (hash) { return hash === event.topics[0]; });
            console.log(index);
            if (index >= 0) {
                expect(eventSigs[index]).to.equal(expected[key]);
            }
        });
    }
    var abi = [
        'event Incoming(uint256 indexed id,address indexed provider,address indexed subscriber,string query,bytes32 endpoint,bytes32[] endpointParams,bool onchainSubscriber)'
    ];
    var IncomingInterface = new hardhat_1.ethers.utils.Interface(abi);
    it('DISPATCH_1 - offChainOracle - Check that we can make a simple offchain query and the correct events are emitted', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, r, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, zapToken
                                .connect(subscriberAccount)
                                .approve(bondage.address, approveTokens)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage
                                .connect(subscriberAccount)
                                .delegateBond(subscriber.address, owner.address, spec1, 10)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, subscriber
                                .connect(subscriberAccount)
                                .testQuery(owner.address, query, spec1, params)];
                    case 5:
                        result = _a.sent();
                        return [4 /*yield*/, result.wait()];
                    case 6:
                        r = _a.sent();
                        console.log(r.events);
                        expected = [
                            'Escrowed(address,address,bytes32,uint256)',
                            'Incoming(uint256,address,address,string,bytes32,bytes32[],bool)',
                            'MadeQuery(address,string,uint256)',
                            'FulfillQuery(address,address,bytes32)'
                        ];
                        validateEvents(r.events, expected);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('DISPATCH_1.1 - onChainOracle - Check that we can make a simple offchain query and the correct events are emitted', function () {
        return __awaiter(this, void 0, void 0, function () {
            var spec, d, result, r, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, zapToken
                                .connect(subscriberAccount)
                                .approve(bondage.address, approveTokens)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, oracle.spec1()];
                    case 4:
                        spec = _a.sent();
                        console.log("the oracle spec is " + spec);
                        return [4 /*yield*/, bondage
                                .connect(subscriberAccount)
                                .delegateBond(subscriber.address, oracle.address, spec, 10)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, bondage.dispatchAddress()];
                    case 6:
                        d = _a.sent();
                        console.log(d);
                        console.log("DISPATCH ADDRESSSSSSSSSSSSSSSSSSSSSSSSS!!!!");
                        return [4 /*yield*/, subscriber
                                .connect(subscriberAccount)
                                .testQuery(oracle.address, query, spec, params)];
                    case 7:
                        result = _a.sent();
                        return [4 /*yield*/, result.wait()];
                    case 8:
                        r = _a.sent();
                        expected = [
                            'Escrowed(address,address,bytes32,uint256)',
                            'RecievedQuery(string,bytes32,bytes32[])',
                            '',
                            'FulfillQuery(address,address,bytes32)',
                            'Result1(uint256,string)',
                            'MadeQuery(address,string,uint256)'
                        ];
                        validateEvents(r.events, expected);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('DISPATCH_2 - query() - Check query function will not be performed if subscriber will not have enough dots', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, expect(subscriber
                                .connect(subscriberAccount)
                                .testQuery(owner.address, query, spec1, params)).to.reverted];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    /**  it("DISPATCH_3 - query() - Check query function will not be performed if msg.sender is not subscriber", async function () {
              await prepareProvider();
              await prepareTokens();
              await zapToken.connect(subscriberAccount).approve(bondage.address, approveTokens);
              
              await bondage.connect(subscriberAccount).delegateBond(subscriber.address, owner.address, spec1, 10);
              
              //await expect(subscriber.connect(escrower).testQuery(owner.address, query, spec1, params)).to.reverted;
              //await expect(this.test.dispatch.query(oracleAddr, query, spec1, params, {from: accounts[4]})).to.be.eventually.rejectedWith(EVMRevert);
          });
          **/
    it('DISPATCH_4 - query() - Check that our contract will revert with an invalid endpoint', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, zapToken
                                .connect(subscriberAccount)
                                .approve(bondage.address, approveTokens)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, bondage
                                .connect(subscriberAccount)
                                .delegateBond(subscriber.address, owner.address, spec1, 10)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, expect(subscriber
                                .connect(subscriberAccount)
                                .testQuery(owner.address, query, badSpec, params)).to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('DISPATCH_5 - query() - test a query to an offchain subscriber', function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var result, r, incoming, decoded, id, res, CallbackResp, storedResponse, storedResponsebyOrder, logs, offchainSubInterface, Result1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, zapToken
                                .connect(subscriberAccount)
                                .approve(bondage.address, approveTokens)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, bondage
                                .connect(subscriberAccount)
                                .delegateBond(offchainsubscriber.address, owner.address, spec2, 100)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, offchainsubscriber
                                .connect(subscriberAccount)
                                .testQuery(owner.address, query, spec2, params)];
                    case 5:
                        result = _c.sent();
                        return [4 /*yield*/, result.wait()];
                    case 6:
                        r = _c.sent();
                        incoming = (_a = r.events) !== null && _a !== void 0 ? _a : [];
                        decoded = IncomingInterface.parseLog(incoming[1]);
                        console.log("DECODED");
                        id = decoded.args[0];
                        return [4 /*yield*/, dispatch.connect(owner).respond1(id, "A TEST RESPONSE")];
                    case 7:
                        res = _c.sent();
                        return [4 /*yield*/, res.wait()];
                    case 8:
                        CallbackResp = _c.sent();
                        return [4 /*yield*/, offchainsubscriber.getQueryResultById(id)];
                    case 9:
                        storedResponse = _c.sent();
                        return [4 /*yield*/, offchainsubscriber.getQueryResultByOrder(0)];
                    case 10:
                        storedResponsebyOrder = _c.sent();
                        expect(storedResponse).to.equal("A TEST RESPONSE");
                        expect(storedResponsebyOrder).to.equal("A TEST RESPONSE");
                        logs = (_b = CallbackResp.events) !== null && _b !== void 0 ? _b : [];
                        offchainSubInterface = new hardhat_1.ethers.utils.Interface(OffChainClient_json_1.default.abi);
                        Result1 = offchainSubInterface.parseLog(logs[2]);
                        expect(Result1.args["response1"]).to.equal("A TEST RESPONSE");
                        return [2 /*return*/];
                }
            });
        });
    });
    it('DISPATCH_6 - query() - test a query to an offchain subscriber through dispatch fails from unathorized ', function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result, r, incoming, decoded, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, zapToken
                                .connect(subscriberAccount)
                                .approve(bondage.address, approveTokens)];
                    case 3:
                        _b.sent();
                        console.log('delegating');
                        return [4 /*yield*/, bondage
                                .connect(subscriberAccount)
                                .delegateBond(offchainsubscriber.address, owner.address, spec2, 100)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, offchainsubscriber
                                .connect(subscriberAccount)
                                .testQuery(owner.address, query, spec2, params)];
                    case 5:
                        result = _b.sent();
                        return [4 /*yield*/, result.wait()];
                    case 6:
                        r = _b.sent();
                        incoming = (_a = r.events) !== null && _a !== void 0 ? _a : [];
                        decoded = IncomingInterface.parseLog(incoming[1]);
                        id = decoded.args[0];
                        return [4 /*yield*/, expect(dispatch.connect(subscriberAccount).respond1(2, "A TEST RESPONSE")).to.reverted];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
