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
describe('ZapCoordinator', function () {
    var coordinator;
    var db;
    var registry;
    var registry2;
    var NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var signers, coordinatorFactory, dbFactory, registryFactory;
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
                    coordinator = (_a.sent());
                    return [4 /*yield*/, coordinator.deployed()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Database', signers[0])];
                case 5:
                    dbFactory = _a.sent();
                    return [4 /*yield*/, dbFactory.deploy()];
                case 6:
                    db = (_a.sent());
                    return [4 /*yield*/, coordinator.deployed()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Registry', signers[0])];
                case 8:
                    registryFactory = _a.sent();
                    return [4 /*yield*/, registryFactory.deploy(coordinator.address)];
                case 9:
                    registry = (_a.sent());
                    return [4 /*yield*/, registryFactory.deploy(coordinator.address)];
                case 10:
                    registry2 = (_a.sent());
                    return [4 /*yield*/, db.transferOwnership(coordinator.address)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('DATABASE', db.address)];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('COORDINATOR_1 - addImmutableContract() - Check that we can set the DATABASE to provider', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    });
    it("COORDINATOR_2 - addImmutableContract() - Check that we can't set the DATABASE to a null address", function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(coordinator.addImmutableContract('DATABASE', NULL_ADDRESS)).to
                            .reverted];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('COORDINATOR_3 - addImmutableContract() - Check that when we set the DATABASE it updates db', function () {
        return __awaiter(this, void 0, void 0, function () {
            var addr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, coordinator.db()];
                    case 1:
                        addr = _a.sent();
                        return [4 /*yield*/, expect(addr).to.equal(db.address)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('COORDINATOR_4 - getContract() - Check that we can get the DATABASE address after setting it', function () {
        return __awaiter(this, void 0, void 0, function () {
            var addr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, coordinator.getContract('DATABASE')];
                    case 1:
                        addr = _a.sent();
                        return [4 /*yield*/, expect(addr).to.equal(db.address)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("COORDINATOR_5 - getContractName() - Check that DATABASE doesn't add to loadedContracts", function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(coordinator.getContractName(0)).to.reverted];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('COORDINATOR_6 - updateContract() - Check that we can update REGISTRY', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(coordinator.updateContract('REGISTRY', registry.address))
                            .to.emit(coordinator, 'UpdatedContract')
                            .withArgs('REGISTRY', NULL_ADDRESS, registry.address)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('COORDINATOR_7 - updateContract() - Check that we can update REGISTRY twice', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(coordinator.updateContract('REGISTRY', registry.address))
                            .to.emit(coordinator, 'UpdatedContract')
                            .withArgs('REGISTRY', NULL_ADDRESS, registry.address)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(coordinator.updateContract('REGISTRY', registry2.address))
                                .to.emit(coordinator, 'UpdatedContract')
                                .withArgs('REGISTRY', registry.address, registry2.address)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('COORDINATOR_8 - getContract() - Check that we get the REGISTRY address after updateContract', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, expect(coordinator.updateContract('REGISTRY', registry.address))
                            .to.emit(coordinator, 'UpdatedContract')
                            .withArgs('REGISTRY', NULL_ADDRESS, registry.address)];
                    case 1:
                        _b.sent();
                        _a = expect;
                        return [4 /*yield*/, coordinator.getContract('REGISTRY')];
                    case 2: return [4 /*yield*/, _a.apply(void 0, [_b.sent()]).to.equal(registry.address)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('COORDINATOR_9 - getContract() - Check that we get the REGISTRY address after two updateContracts', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, coordinator.updateContract('REGISTRY', registry.address)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, coordinator.updateContract('REGISTRY', registry2.address)];
                    case 2:
                        _b.sent();
                        _a = expect;
                        return [4 /*yield*/, coordinator.getContract('REGISTRY')];
                    case 3: return [4 /*yield*/, _a.apply(void 0, [_b.sent()]).to.equal(registry2.address)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
// Emitting events
// Testing what events were emitted with what arguments:
// await expect(token.transfer(walletTo.address, 7))
//   .to.emit(token, 'Transfer')
//   .withArgs(wallet.address, walletTo.address, 7);
