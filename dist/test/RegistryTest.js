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
describe('Registry Test', function () {
    /**
     * @param database Stores the deployed Database
     * @param coordinator Stores the deployed Coordinator
     * @param registry Stores the deployed Registry
     * @param databaseFactory Stores the instance of the Database
     * @param coordinatorFactory Stores the instance of the Coordinator
     * @param registryFactory Stores the instance of the Registry
     * @param signers Contains the 20 test accounts provider by Hardhat
     * @param providerTitle Stores the testProvider.title converted as a bytes32 string
     * @param convertedEndpoint Stores the testProvider.endpoint converted as a bytes32 string
     * @param convertedParams Stores the test markdown and JSON params inside an array
     * @param parameters Stores the test markdown and JSON URL's inside an array
     */
    var database;
    var coordinator;
    var registry;
    var databaseFactory;
    var coordinatorFactory;
    var registryFactory;
    var signers;
    var providerTitle;
    var convertedEndpoint;
    var convertedParams;
    var parameters;
    /**
     * @param testProvider Stores the key/value pairs needed to create, read, and maintain a provider
     * @param publicKey Stores the test unique id to instantiate a provider
     * @param title Name of the test provider before bytes32 conversion
     * @param endpointParams Stores the test endpoint params before bytes32 conversion
     * @param markdownFile Stores the test curve markdown file before bytes32 conversion
     * @param jsonFile Stores the test curve JSON file before bytes32 conversion
     * @param endpoint Stores the test endpoint before bytes32 conversion
     * @param curve Stores the test coefficient array for the provider curve
     * @param emptyBroker Stores the test 0x0 broker address
     */
    var testProvider = {
        publicKey: 123,
        title: 'testProvider',
        endpointParams: ['p1.md', 'p2.json'],
        markdownFile: 'https://raw.githubusercontent.com/mxstbr/markdown-test-file/master/TEST.md',
        jsonFile: ' https://gateway.ipfs.io/ipfs/QmaWPP9HFvWZceV8en2kisWdwZtrTo8ZfamEzkTuFg3PFr',
        endpoint: 'testEndpoint',
        curve: [3, 0, 2, 1, 100],
        emptyBroker: '0x0000000000000000000000000000000000000000'
    };
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    // Gets the 20 test accounts
                    signers = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapCoordinator', signers[0])];
                case 2:
                    // First signer instantiating the Coordinator, Database, and Registry contracts
                    coordinatorFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Database', signers[0])];
                case 3:
                    databaseFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Registry', signers[0])];
                case 4:
                    registryFactory = _a.sent();
                    return [4 /*yield*/, databaseFactory.deploy()];
                case 5:
                    // Deploys the Database contract
                    database = (_a.sent());
                    return [4 /*yield*/, database.deployed()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, coordinatorFactory.deploy()];
                case 7:
                    // Deployes the Coordinator contract
                    coordinator = (_a.sent());
                    return [4 /*yield*/, coordinator.deployed()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, registryFactory.deploy(coordinator.address)];
                case 9:
                    // Deploys the Registry Contract
                    registry = (_a.sent());
                    return [4 /*yield*/, registry.deployed()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, database.transferOwnership(coordinator.address)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('DATABASE', database.address)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('REGISTRY', registry.address)];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateAllDependencies()];
                case 14:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('REGISTRY_1 - Should be able to create an instance of the ZapCoordinator contract', function () {
        // Expects coordinatorFactory to be fulfilled
        expect(coordinatorFactory).to.be.ok;
    });
    it('REGISTRY_2 - Should be able to create an instance of the Registry contract', function () {
        // Expects registryFactory to be fulfilled
        expect(registryFactory).to.be.ok;
    });
    it('REGISTRY_3 - Should be able to create an instance of the Database contract', function () {
        // Expects databaseFactory to be fulfilled
        expect(databaseFactory).to.be.ok;
    });
    it('REGISTRY_4 - Should be able to deploy the ZapCoordinator contract', function () {
        // Expects coordinator to be fulfilled
        expect(coordinator).to.be.ok;
    });
    it('REGISTRY_5 - Should be able to deploy the Registry contract', function () {
        // Expects registry to be fulfilled
        expect(registry).to.be.ok;
    });
    it('REGISTRY_6 - Should be able to deploy the Database contract', function () {
        // Expects database to be fulfilled
        expect(database).to.be.ok;
    });
    it("REGISTRY_7 - initiateProvider() - Check that we can initiate provider", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Converts testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Expect the initiateProvider function to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expect the initiateProvider function to be fulfilled
                    _a.apply(void 0, [_b.sent()]).to.be.ok;
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_8 - initiateProvider() - Check that we can't change provider info if it was initated", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newTestTitle, newPublicKey, _a, _b, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    newTestTitle = hardhat_1.ethers.utils.formatBytes32String('newTestProvider');
                    newPublicKey = 789;
                    // Converts testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Expect the initiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expect the initiateProvider to be fulfilled
                    _a.apply(void 0, [_c.sent()]).to.be.ok;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    // Expect trying to initiate a provider twice to throw an error
                    _b = expect;
                    return [4 /*yield*/, registry.initiateProvider(newPublicKey, newTestTitle)];
                case 3:
                    // Expect trying to initiate a provider twice to throw an error
                    _b.apply(void 0, [_c.sent()]).to.throw('Provider is already initiated');
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _c.sent();
                    console.log('Provider is already initiated');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_9 - initiateProviderCurve() - Check that we can initiate provider curve", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Converts testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Converts testProvider.endpoint to a bytes32 string
                    convertedEndpoint = hardhat_1.ethers.utils.formatBytes32String(testProvider.endpoint);
                    // Expect the intiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expect the intiateProvider to be fulfilled
                    _a.apply(void 0, [_c.sent()]).to.be.ok;
                    // Expect the initiateProviderCurve to be fulfilled
                    _b = expect;
                    return [4 /*yield*/, registry.initiateProviderCurve(convertedEndpoint, testProvider.curve, testProvider.emptyBroker)];
                case 2:
                    // Expect the initiateProviderCurve to be fulfilled
                    _b.apply(void 0, [_c.sent()]).to.be.ok;
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_10 - initiateProviderCurve() - Check that we can't initiate provider curve if provider wasn't initiated", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Converts testProvider.endpoint to a bytes32 string
                    convertedEndpoint = hardhat_1.ethers.utils.formatBytes32String(testProvider.endpoint);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    // Expect trying to initiate a curve without initiating the provider to throw an error
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProviderCurve(convertedEndpoint, testProvider.curve, testProvider.emptyBroker)];
                case 2:
                    // Expect trying to initiate a curve without initiating the provider to throw an error
                    _a.apply(void 0, [_b.sent()]).to.throw('Curve can not be initiated, The provider is not initiated');
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    console.log('Curve can not be initiated, The provider is not initiated');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_11 - get/setEndpointParams() - Check that we can get and set provider endpoint parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, getParams;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // Converts the testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Converts testProvider.endpoint to a bytes32 string
                    convertedEndpoint = hardhat_1.ethers.utils.formatBytes32String(testProvider.endpoint);
                    // Converts testProvider.endpointParams to an array of bytes32 strings
                    convertedParams = testProvider.endpointParams.map(function (param) { return hardhat_1.ethers.utils.formatBytes32String(param); });
                    // Expect initiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expect initiateProvider to be fulfilled
                    _a.apply(void 0, [_d.sent()]).to.be.ok;
                    // Expect initiateProviderCurve to be fulfilled
                    _b = expect;
                    return [4 /*yield*/, registry.initiateProviderCurve(convertedEndpoint, testProvider.curve, testProvider.emptyBroker)];
                case 2:
                    // Expect initiateProviderCurve to be fulfilled
                    _b.apply(void 0, [_d.sent()]).to.be.ok;
                    // Expect setEndpointParams to be fulfilled
                    _c = expect;
                    return [4 /*yield*/, registry.setEndpointParams(convertedEndpoint, convertedParams)];
                case 3:
                    // Expect setEndpointParams to be fulfilled
                    _c.apply(void 0, [_d.sent()]).to.be.ok;
                    return [4 /*yield*/, registry.getEndpointParams(signers[0].address, convertedEndpoint)];
                case 4:
                    getParams = _d.sent();
                    // Expect the first param(markdown param) returned to equal the first converted param
                    expect(getParams[0]).to.equal(convertedParams[0]);
                    // Expect the second param(JSON param) returned to equal the second converted param
                    expect(getParams[1]).to.equal(convertedParams[1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_12 - get/setProviderParameter() - Check that we can get and set provider parameters", function () { return __awaiter(void 0, void 0, void 0, function () {
        var bytesParameters, i, _a, _b, _c, getParams, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    // Converts the provider title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Converts testProvider.endpointParams to an array of bytes32 strings
                    convertedParams = testProvider.endpointParams.map(function (param) { return hardhat_1.ethers.utils.formatBytes32String(param); });
                    // Converts testProvider.endpoint to a bytes32 string
                    convertedEndpoint = hardhat_1.ethers.utils.formatBytes32String(testProvider.endpoint);
                    // Stores the markdown & JSON URL's in an array
                    parameters = [testProvider.markdownFile, testProvider.jsonFile];
                    bytesParameters = [];
                    for (i = 0; i < parameters.length; i++) {
                        // Storing each converted parameter
                        bytesParameters.push(hardhat_1.ethers.utils.toUtf8Bytes(parameters[i]));
                    }
                    // Convert to bytes
                    bytesParameters = bytesParameters.map(function (parameter) { return hardhat_1.ethers.utils.hexlify(parameter); });
                    // Expect initiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expect initiateProvider to be fulfilled
                    _a.apply(void 0, [_h.sent()]).to.be.ok;
                    // Expect initiateProviderCurve to be fulfilled
                    _b = expect;
                    return [4 /*yield*/, registry.initiateProviderCurve(convertedEndpoint, testProvider.curve, testProvider.emptyBroker)];
                case 2:
                    // Expect initiateProviderCurve to be fulfilled
                    _b.apply(void 0, [_h.sent()]).to.be.ok;
                    // Expect setEndpointParams to be fulfilled
                    _c = expect;
                    return [4 /*yield*/, registry.setEndpointParams(convertedEndpoint, convertedParams)];
                case 3:
                    // Expect setEndpointParams to be fulfilled
                    _c.apply(void 0, [_h.sent()]).to.be.ok;
                    return [4 /*yield*/, registry.getEndpointParams(signers[0].address, convertedEndpoint)];
                case 4:
                    getParams = _h.sent();
                    // Expect the setProviderParameter on the markdown link to be fulfilled
                    _d = expect;
                    return [4 /*yield*/, registry.setProviderParameter(getParams[0], bytesParameters[0])];
                case 5:
                    // Expect the setProviderParameter on the markdown link to be fulfilled
                    _d.apply(void 0, [_h.sent()]).to.be.ok;
                    // Expect the setProviderParameter on the JSON link to be fulfilled
                    _e = expect;
                    return [4 /*yield*/, registry.setProviderParameter(getParams[1], bytesParameters[1])];
                case 6:
                    // Expect the setProviderParameter on the JSON link to be fulfilled
                    _e.apply(void 0, [_h.sent()]).to.be.ok;
                    // Expect getProviderParameter on the markdown link to be fulfilled
                    _f = expect;
                    return [4 /*yield*/, registry.getProviderParameter(signers[0].address, getParams[0])];
                case 7:
                    // Expect getProviderParameter on the markdown link to be fulfilled
                    _f.apply(void 0, [_h.sent()])
                        .to.equal(bytesParameters[0]);
                    // Expect the getProviderParameter on the JSON link to be fulfilled
                    _g = expect;
                    return [4 /*yield*/, registry.getProviderParameter(signers[0].address, getParams[1])];
                case 8:
                    // Expect the getProviderParameter on the JSON link to be fulfilled
                    _g.apply(void 0, [_h.sent()])
                        .to.equal(bytesParameters[1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_13 - getProviderTitle() - Check that we can get provider title", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Converts testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Expects initiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expects initiateProvider to be fulfilled
                    _a.apply(void 0, [_c.sent()]).to.be.ok;
                    // Expects getProviderTitle to be fulfilled
                    _b = expect;
                    return [4 /*yield*/, registry.getProviderTitle(signers[0].address)];
                case 2:
                    // Expects getProviderTitle to be fulfilled
                    _b.apply(void 0, [_c.sent()]).to.equal(providerTitle);
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_14 - getProviderTitle() - Check that title of uninitialized provider is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Expect getProviderTitle to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.getProviderTitle(signers[0].address)];
                case 1:
                    // Expect getProviderTitle to be fulfilled
                    _a.apply(void 0, [_b.sent()])
                        .to.equal('0x0000000000000000000000000000000000000000000000000000000000000000');
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_15 - getProviderPublicKey() - Check that we can get provider public key", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Converts testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Expect initiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expect initiateProvider to be fulfilled
                    _a.apply(void 0, [_c.sent()]).to.be.ok;
                    // Expect getProviderPublicKey to be returned
                    _b = expect;
                    return [4 /*yield*/, registry.getProviderPublicKey(signers[0].address)];
                case 2:
                    // Expect getProviderPublicKey to be returned
                    _b.apply(void 0, [_c.sent()]).to.equal(testProvider.publicKey);
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_16 - getProviderPublicKey() - Check that public key of uninitialized provider is equal to 0", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Expects to fulfill without being initialized
                    _a = expect;
                    return [4 /*yield*/, registry.getProviderPublicKey(signers[0].address)];
                case 1:
                    // Expects to fulfill without being initialized
                    _a.apply(void 0, [_b.sent()]).to.equal(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_17 - getProviderCurve() - Check that we initialize and get provider curve", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, curve, curveLength, getCurve, getCurveLength, i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Converts testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Converts testProvider.endpoint to a bytes32 string
                    convertedEndpoint = hardhat_1.ethers.utils.formatBytes32String(testProvider.endpoint);
                    // Expect intiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expect intiateProvider to be fulfilled
                    _a.apply(void 0, [_c.sent()]).to.be.ok;
                    // Expect initiateProviderCurve to be fulfilled
                    _b = expect;
                    return [4 /*yield*/, registry.initiateProviderCurve(convertedEndpoint, testProvider.curve, testProvider.emptyBroker)];
                case 2:
                    // Expect initiateProviderCurve to be fulfilled
                    _b.apply(void 0, [_c.sent()]).to.be.ok;
                    curve = [];
                    curveLength = 0;
                    return [4 /*yield*/, registry.getProviderCurve(signers[0].address, convertedEndpoint)];
                case 3:
                    getCurve = _c.sent();
                    return [4 /*yield*/, registry.getProviderCurveLength(signers[0].address, convertedEndpoint)];
                case 4:
                    getCurveLength = _c.sent();
                    for (i = 0; i < getCurve.length; i++) {
                        // Converts each array element from a hexstring to a readable integer
                        curve.push(parseInt(getCurve[i]._hex));
                    }
                    // Parses getCurveLength to a readable integer and sets the value for curve length
                    curveLength = parseInt(getCurveLength._hex);
                    // Expect the manual curve length to equal the manual test provider curve length
                    expect(curve.length).to.equal(testProvider.curve.length);
                    // Expect the returned getProviderCurveLength to equal the manual test provider curve length
                    expect(curveLength).to.equal(testProvider.curve.length);
                    // Expect the curve to equal thte test provider curve
                    expect(curve).to.eql(testProvider.curve);
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_18 - getProviderCurve() - Check that cant get uninitialized curve ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, err_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Converts the testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Converts testProvider.endpoint to a bytes32 string
                    convertedEndpoint = hardhat_1.ethers.utils.formatBytes32String(testProvider.endpoint);
                    // Expect intitiate Provider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expect intitiate Provider to be fulfilled
                    _a.apply(void 0, [_c.sent()]).to.be.ok;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    // Expect trying to get a provider curve that wasnt initialized to throw an error
                    _b = expect;
                    return [4 /*yield*/, registry.getProviderCurve(signers[0].address, convertedEndpoint)];
                case 3:
                    // Expect trying to get a provider curve that wasnt initialized to throw an error
                    _b.apply(void 0, [_c.sent()]).to.throw('Curve is not initialized');
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _c.sent();
                    console.log('Curve is not initialized');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_19 - getAllOracles() - Check that we can get all providers", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, providers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Converts the testProvider.title to a bytes32 string
                        providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                        // Expect intiateProvider to be fulfilled
                        _a = expect;
                        return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                    case 1:
                        // Expect intiateProvider to be fulfilled
                        _a.apply(void 0, [_b.sent()]).to.be.ok;
                        return [4 /*yield*/, registry.getAllOracles()];
                    case 2:
                        providers = _b.sent();
                        // Expect the returned provider to be the same
                        expect(providers[0]).to.equal(signers[0].address);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("REGISTRY_20 - getEndpointBroker() - Check that broker address can be saved and retreived", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, brokerAddress;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Converts the testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Converts the testProvider.endpoint to a bytes32 string
                    convertedEndpoint = hardhat_1.ethers.utils.formatBytes32String(testProvider.endpoint);
                    // Expects the initiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expects the initiateProvider to be fulfilled
                    _a.apply(void 0, [_c.sent()]).to.be.ok;
                    // Expects the initiateProviderCurve to be fulfilled
                    _b = expect;
                    return [4 /*yield*/, registry.initiateProviderCurve(convertedEndpoint, testProvider.curve, testProvider.emptyBroker)];
                case 2:
                    // Expects the initiateProviderCurve to be fulfilled
                    _b.apply(void 0, [_c.sent()]).to.be.ok;
                    return [4 /*yield*/, registry.getEndpointBroker(signers[0].address, convertedEndpoint)];
                case 3:
                    brokerAddress = _c.sent();
                    // Expects getEndpointBroker to equal testProvider.emptyBroker
                    expect(brokerAddress).to.equal(testProvider.emptyBroker);
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_21 - clearEndpoint() - Check that provider can clear endpoint with no bonds", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, endpoint, _c, clearEndpoint;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // Converts testProvider.title to a bytes32 string
                    providerTitle = hardhat_1.ethers.utils.formatBytes32String(testProvider.title);
                    // Converts testProvider.endpoint to a bytes32 string
                    convertedEndpoint = hardhat_1.ethers.utils.formatBytes32String(testProvider.endpoint);
                    // Expect initiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, providerTitle)];
                case 1:
                    // Expect initiateProvider to be fulfilled
                    _a.apply(void 0, [_d.sent()]).to.be.ok;
                    // Expect initiateProviderCurve to be fulfilled
                    _b = expect;
                    return [4 /*yield*/, registry.initiateProviderCurve(convertedEndpoint, testProvider.curve, testProvider.emptyBroker)];
                case 2:
                    // Expect initiateProviderCurve to be fulfilled
                    _b.apply(void 0, [_d.sent()]).to.be.ok;
                    return [4 /*yield*/, registry.getProviderEndpoints(signers[0].address)];
                case 3:
                    endpoint = _d.sent();
                    // Expect clearEndpoint to be fulfilled
                    _c = expect;
                    return [4 /*yield*/, registry.clearEndpoint(endpoint[0])];
                case 4:
                    // Expect clearEndpoint to be fulfilled
                    _c.apply(void 0, [_d.sent()]).to.be.ok;
                    return [4 /*yield*/, registry.getProviderEndpoints(signers[0].address)];
                case 5:
                    clearEndpoint = _d.sent();
                    // Expect the cleared endpoint to be 0x0
                    expect(clearEndpoint[0]).to.eql('0x0000000000000000000000000000000000000000000000000000000000000000');
                    return [2 /*return*/];
            }
        });
    }); });
    it("REGISTRY_22 - setProviderTitle() - Check that provider can change their title", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newProviderTitle, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    newProviderTitle = hardhat_1.ethers.utils.formatBytes32String('newTestProvider');
                    // Expects initiateProvider to be fulfilled
                    _a = expect;
                    return [4 /*yield*/, registry.initiateProvider(testProvider.publicKey, newProviderTitle)];
                case 1:
                    // Expects initiateProvider to be fulfilled
                    _a.apply(void 0, [_d.sent()]).to.be.ok;
                    // Expects setProviderTitle to be fulfilled
                    _b = expect;
                    return [4 /*yield*/, registry.setProviderTitle(newProviderTitle)];
                case 2:
                    // Expects setProviderTitle to be fulfilled
                    _b.apply(void 0, [_d.sent()]).to.be.ok;
                    // Expects the returned provider title be equal newProviderTitle
                    _c = expect;
                    return [4 /*yield*/, registry.getProviderTitle(signers[0].address)];
                case 3:
                    // Expects the returned provider title be equal newProviderTitle
                    _c.apply(void 0, [_d.sent()]).to.equal(newProviderTitle);
                    return [2 /*return*/];
            }
        });
    }); });
});
