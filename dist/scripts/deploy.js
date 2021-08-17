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
var hre = require("hardhat");
// const fs = require('fs')
// const curveParams1 = [3, 0, 0, 2, 1000];
// const curveParams2 = [3, 1, 2, 3, 1000];
// const curveParams3 = [1, 10, 1000];
// const curveParams4 = [3, 1, 2, 3, 10, 1, 2, 20];
//const publicKey = 77
//const title = '0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce532';
//const routeKeys = [1];
//const params = ["param1", "param2"];
//const specifier = "0x048a2991c2676296b330734992245f5ba6b98174d3f1907d795b7639e92ce577";
//const zeroAddress = '0x0000000000000000000000000000000000000000'
// const piecewiseFunction = [3, 0, 0, 2, 10000];
var tokensForOwner = hardhat_1.ethers.BigNumber.from("1500000000000000000000000000000");
var tokensForSubscriber = hardhat_1.ethers.BigNumber.from("50000000000000000000000000000");
var approveTokens = hardhat_1.ethers.BigNumber.from("1000000000000000000000000000000");
//const dotBound = ethers.BigNumber.from("999");
// const structurizeCurve = function (parts: any) {
//   const pieces = Array();
//   let index = 0;
//   let start = 1;
//   while (index < parts.length) {
//     const length = parts[index];
//     const base = index + 1;
//     const terms = parts.slice(base, base + length);
//     const end = parts[base + length];
//     pieces.push({
//       terms,
//       start,
//       end
//     });
//     index = base + length + 1;
//     start = end;
//   }
//   return pieces;
// };
// const calcNextDotCost = function (structurizedCurve: any, total: any) {
//   if (total < 0) {
//     return 0;
//   }
// for (let i = 0; i < structurizedCurve.length; i++) {
//   if (structurizedCurve[i].start <= total && total <= structurizedCurve[i].end) {
//     return _calculatePolynomial(structurizedCurve[i].terms, total);
//   }
// }
//   return 0;
// };
// const calcDotsCost = function (structurizedCurve: any, numDots: any) {
//   let cost = 0;
//   for (let i = 1; i <= numDots; i++) {
//     cost += calcNextDotCost(structurizedCurve, i);
//   }
//   return cost;
// };
//TODO move these functions to another file
// function _calculatePolynomial(terms: any, x: any) {
//   let sum = 0;
//   for (let i = 0; i < terms.length; i++) {
//     sum += terms[i] * (x ** i);
//   }
//   return sum;
// }
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var signers, owner, broker, tokenFactory, zapToken, coordinator, Coordinator, arbiter, Arbiter, currentcost, CurrentCost, database, Database, dispatch, Dispatch, faucetContract, faucet, registry, Registry, bondage, Bondage, subscriberFactory, offchainSubscriberFactory, oracleFactory, subscriber, offchainsubscriber, oracle, dotFactoryFactory, genericTokenFactory, generictoken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    signers = _a.sent();
                    owner = signers[0];
                    broker = signers[3];
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapToken', signers[0])];
                case 2:
                    tokenFactory = _a.sent();
                    return [4 /*yield*/, tokenFactory.deploy()];
                case 3:
                    zapToken = _a.sent();
                    return [4 /*yield*/, zapToken.deployed()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('ZapCoordinator', signers[0])];
                case 5:
                    coordinator = _a.sent();
                    return [4 /*yield*/, coordinator.deploy()];
                case 6:
                    Coordinator = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Arbiter', signers[0])];
                case 7:
                    arbiter = _a.sent();
                    return [4 /*yield*/, arbiter.deploy(Coordinator.address)];
                case 8:
                    Arbiter = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('CurrentCost', signers[0])];
                case 9:
                    currentcost = _a.sent();
                    return [4 /*yield*/, currentcost.deploy(Coordinator.address)];
                case 10:
                    CurrentCost = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Database', signers[0])];
                case 11:
                    database = _a.sent();
                    return [4 /*yield*/, database.deploy()];
                case 12:
                    Database = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Dispatch', signers[0])];
                case 13:
                    dispatch = _a.sent();
                    return [4 /*yield*/, dispatch.deploy(Coordinator.address)];
                case 14:
                    Dispatch = _a.sent();
                    console.log("Dispatch address is " + Dispatch.address);
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Faucet', signers[0])];
                case 15:
                    faucetContract = _a.sent();
                    return [4 /*yield*/, faucetContract.deploy(zapToken.address)];
                case 16:
                    faucet = _a.sent();
                    return [4 /*yield*/, faucet.deployed()];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Registry', signers[0])];
                case 18:
                    registry = _a.sent();
                    return [4 /*yield*/, registry.deploy(Coordinator.address)];
                case 19:
                    Registry = _a.sent();
                    // Transfer ownership before creating bondage contract
                    return [4 /*yield*/, Database.transferOwnership(Coordinator.address)];
                case 20:
                    // Transfer ownership before creating bondage contract
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Bondage', signers[0])];
                case 21:
                    bondage = _a.sent();
                    return [4 /*yield*/, bondage.deploy(Coordinator.address)];
                case 22:
                    Bondage = _a.sent();
                    return [4 /*yield*/, Coordinator.addImmutableContract('DATABASE', Database.address)];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, Coordinator.addImmutableContract('ARBITER', Arbiter.address)];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, Coordinator.addImmutableContract('FAUCET', faucet.address)];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, Coordinator.addImmutableContract('ZAP_TOKEN', zapToken.address)];
                case 26:
                    _a.sent();
                    //await Coordinator.addImmutableContract('DISPATCH', Dispatch.address);
                    //await Coordinator.addImmutableContract('BONDAGE', Bondage.address);
                    return [4 /*yield*/, Coordinator.updateContract('REGISTRY', Registry.address)];
                case 27:
                    //await Coordinator.addImmutableContract('DISPATCH', Dispatch.address);
                    //await Coordinator.addImmutableContract('BONDAGE', Bondage.address);
                    _a.sent();
                    return [4 /*yield*/, Coordinator.updateContract('CURRENT_COST', CurrentCost.address)];
                case 28:
                    _a.sent();
                    return [4 /*yield*/, Coordinator.updateContract('DISPATCH', Dispatch.address)];
                case 29:
                    _a.sent();
                    return [4 /*yield*/, Coordinator.updateContract('BONDAGE', Bondage.address)];
                case 30:
                    _a.sent();
                    return [4 /*yield*/, Coordinator.updateAllDependencies()];
                case 31:
                    _a.sent();
                    return [4 /*yield*/, hre.run('faucet')];
                case 32:
                    _a.sent();
                    return [4 /*yield*/, hre.run('initiateProvider')];
                case 33:
                    _a.sent();
                    return [4 /*yield*/, hre.run('initiateProviderCurve')
                        // await Registry.connect(OracleSigner).initiateProvider(publicKey, title);
                        // await Registry.connect(OracleSigner).initiateProviderCurve(specifier, piecewiseFunction, zeroAddress);
                        // Approve the amount of Zap
                    ];
                case 34:
                    _a.sent();
                    // await Registry.connect(OracleSigner).initiateProvider(publicKey, title);
                    // await Registry.connect(OracleSigner).initiateProviderCurve(specifier, piecewiseFunction, zeroAddress);
                    // Approve the amount of Zap
                    return [4 /*yield*/, zapToken.allocate(owner.address, tokensForOwner)];
                case 35:
                    // await Registry.connect(OracleSigner).initiateProvider(publicKey, title);
                    // await Registry.connect(OracleSigner).initiateProviderCurve(specifier, piecewiseFunction, zeroAddress);
                    // Approve the amount of Zap
                    _a.sent();
                    return [4 /*yield*/, zapToken.allocate(broker.address, tokensForSubscriber)];
                case 36:
                    _a.sent();
                    return [4 /*yield*/, zapToken.connect(broker).approve(Bondage.address, approveTokens)];
                case 37:
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('TestClient')];
                case 38:
                    subscriberFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('OffChainClient')];
                case 39:
                    offchainSubscriberFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('TestProvider')];
                case 40:
                    oracleFactory = _a.sent();
                    return [4 /*yield*/, subscriberFactory.deploy(zapToken.address, Dispatch.address, Bondage.address, Registry.address)];
                case 41:
                    subscriber = (_a.sent());
                    return [4 /*yield*/, offchainSubscriberFactory.deploy(zapToken.address, Dispatch.address, Bondage.address, Registry.address)];
                case 42:
                    offchainsubscriber = (_a.sent());
                    return [4 /*yield*/, oracleFactory.deploy(Registry.address, false)];
                case 43:
                    oracle = (_a.sent());
                    return [4 /*yield*/, oracle.deployed()];
                case 44:
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('DotFactoryFactory', signers[0])];
                case 45:
                    dotFactoryFactory = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('TokenFactory', signers[0])];
                case 46:
                    genericTokenFactory = _a.sent();
                    return [4 /*yield*/, genericTokenFactory.deploy()];
                case 47:
                    generictoken = (_a.sent());
                    return [4 /*yield*/, generictoken.deployed()];
                case 48:
                    _a.sent();
                    return [4 /*yield*/, dotFactoryFactory.deploy(Coordinator.address, generictoken.address)];
                case 49:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () {
    return process.exit(0);
})
    .catch(function (error) {
    console.error(error);
    process.exit(1);
});
