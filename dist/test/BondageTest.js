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
    var dataBase;
    var bondage;
    var cost;
    var registry;
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
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var zapTokenFactory, coordinatorFactory, dbFactory, registryFactory, costFactory, bondFactory;
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
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Bondage', signers[0])];
                case 7:
                    bondFactory = _a.sent();
                    return [4 /*yield*/, zapTokenFactory.deploy()];
                case 8:
                    zapToken = (_a.sent());
                    return [4 /*yield*/, zapToken.deployed()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, coordinatorFactory.deploy()];
                case 10:
                    coordinator = (_a.sent());
                    return [4 /*yield*/, coordinator.deployed()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, dbFactory.deploy()];
                case 12:
                    dataBase = (_a.sent());
                    return [4 /*yield*/, costFactory.deploy(coordinator.address)];
                case 13:
                    cost = (_a.sent());
                    return [4 /*yield*/, registryFactory.deploy(coordinator.address)];
                case 14:
                    registry = (_a.sent());
                    return [4 /*yield*/, dataBase.transferOwnership(coordinator.address)];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('DATABASE', dataBase.address)];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('ARBITER', arbiter.address)];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, coordinator.addImmutableContract('ZAP_TOKEN', zapToken.address)];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('REGISTRY', registry.address)];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateContract('CURRENT_COST', cost.address)];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, bondFactory.deploy(coordinator.address)];
                case 21:
                    bondage = (_a.sent());
                    return [4 /*yield*/, coordinator.updateContract('BONDAGE', bondage.address)];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, coordinator.updateAllDependencies()];
                case 23:
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
    it('BONDAGE_1 - bond() - Check bond function', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
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
                        return [4 /*yield*/, bondage.getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 5:
                        result = _a.sent();
                        return [4 /*yield*/, expect(result).to.equal(999)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_4 - unbond() - Check unbond function', function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
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
                        return [4 /*yield*/, bondage
                                .connect(subscriber)
                                .unbond(oracle.address, specifier, dotBound)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, bondage.getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 6:
                        result = _a.sent();
                        return [4 /*yield*/, expect(result).to.equal(0)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_5 - calcZapForDots() - Check zap for dots calculating', function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalBound, structure, fun0Calc, res0;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalBound = 5;
                        return [4 /*yield*/, registry.connect(subscriber).initiateProvider(publicKey, title)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, registry
                                .connect(subscriber)
                                .initiateProviderCurve(specifier, piecewiseFunction, broker.address)];
                    case 2:
                        _a.sent();
                        structure = structurizeCurve(piecewiseFunction);
                        fun0Calc = calcDotsCost(structure, totalBound);
                        console.log(subscriber.address);
                        return [4 /*yield*/, bondage.calcZapForDots(subscriber.address, specifier, totalBound)];
                    case 3:
                        res0 = _a.sent();
                        console.log(res0);
                        //res0.should.be.bignumber.equal(fun0Calc);
                        return [4 /*yield*/, expect(res0).to.equal(fun0Calc)];
                    case 4:
                        //res0.should.be.bignumber.equal(fun0Calc);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_6 - calcZapForDots() - Check that function revert if curve not intialized', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //prepareProvider.call(this.test, true, false);
                    return [4 /*yield*/, registry.connect(oracle).initiateProvider(publicKey, title)];
                    case 1:
                        //prepareProvider.call(this.test, true, false);
                        _a.sent();
                        return [4 /*yield*/, expect(bondage.calcZapForDots(oracle.address, specifier, 5)).to
                                .reverted];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_7 - unbond() - Check unbond zap for dots calculation', function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance, bond_balance, final_balance;
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
                        return [4 /*yield*/, zapToken.balanceOf(subscriber.address)];
                    case 4:
                        balance = _a.sent();
                        // we will get 5 dots with current curve (n: [1-5], p = 2n^2)
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 5)];
                    case 5:
                        // we will get 5 dots with current curve (n: [1-5], p = 2n^2)
                        _a.sent();
                        return [4 /*yield*/, zapToken.balanceOf(subscriber.address)];
                    case 6:
                        bond_balance = _a.sent();
                        // unbond three dots
                        return [4 /*yield*/, bondage.connect(subscriber).unbond(oracle.address, specifier, 3)];
                    case 7:
                        // unbond three dots
                        _a.sent();
                        return [4 /*yield*/, zapToken.balanceOf(subscriber.address)];
                    case 8:
                        final_balance = _a.sent();
                        // expect total bonding to cost 110 and unbonding to return 100 zap (50+32+18)
                        expect(balance.sub(bond_balance)).to.equal(hardhat_1.ethers.BigNumber.from(110));
                        expect(final_balance.sub(bond_balance)).to.equal(hardhat_1.ethers.BigNumber.from(100));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_8 - getBoundDots() - Check received dots getting', function () {
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
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, bondage
                                .connect(subscriber)
                                .getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 5:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(3));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_9 - getBoundDots() - Check that number of dots of unbonded provider is 0', function () {
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
                        return [4 /*yield*/, bondage
                                .connect(subscriber)
                                .getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 4:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(0));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_10 - getZapBound() - Check received ZAP getting', function () {
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
                        // with current linear curve (startValue = 1, multiplier = 2) number of dots received should be equal to 5
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 4:
                        // with current linear curve (startValue = 1, multiplier = 2) number of dots received should be equal to 5
                        _a.sent();
                        return [4 /*yield*/, bondage
                                .connect(subscriber)
                                .getZapBound(oracle.address, specifier)];
                    case 5:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(28));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_11 - getZapBound() - Check that received ZAP of unbonded provider is 0', function () {
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
                        return [4 /*yield*/, bondage
                                .connect(subscriber)
                                .getZapBound(oracle.address, specifier)];
                    case 4:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(0));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_12 - escrowDots() - Check that operator can escrow dots', function () {
        return __awaiter(this, void 0, void 0, function () {
            var dots, dotsForEscrow, subscriberDots, escrowDots;
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
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 4:
                        // we will get 3 dots with current curve
                        _a.sent();
                        dots = 3;
                        dotsForEscrow = 2;
                        return [4 /*yield*/, bondage
                                .connect(arbiter)
                                .escrowDots(subscriber.address, oracle.address, specifier, dotsForEscrow)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, bondage.getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 6:
                        subscriberDots = _a.sent();
                        expect(subscriberDots).to.equal(hardhat_1.ethers.BigNumber.from(dots - dotsForEscrow));
                        return [4 /*yield*/, bondage.getNumEscrow(subscriber.address, oracle.address, specifier)];
                    case 7:
                        escrowDots = _a.sent();
                        expect(escrowDots).to.equal(hardhat_1.ethers.BigNumber.from(dotsForEscrow));
                        return [2 /*return*/];
                }
            });
        });
    });
    it("BONDAGE_13 - escrowDots() - Check that not operator can't escrow dots", function () {
        return __awaiter(this, void 0, void 0, function () {
            var dots, dotsForEscrow;
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
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 4:
                        // we will get 3 dots with current curve
                        _a.sent();
                        dots = 3;
                        dotsForEscrow = 2;
                        return [4 /*yield*/, expect(bondage.escrowDots(subscriber.address, oracle.address, specifier, dotsForEscrow)).to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("BONDAGE_14 - escrowDots() - Check that operator can't escrow dots from oracle that haven't got enough dots", function () {
        return __awaiter(this, void 0, void 0, function () {
            var dots, dotsForEscrow;
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
                        /// we will get 0 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 0)];
                    case 4:
                        /// we will get 0 dots with current curve
                        _a.sent();
                        dots = 0;
                        dotsForEscrow = 2;
                        return [4 /*yield*/, expect(bondage.escrowDots(subscriber.address, oracle.address, specifier, dotsForEscrow)).to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_15 - releaseDots() - Check that operator can release dots', function () {
        return __awaiter(this, void 0, void 0, function () {
            var dots, dotsForEscrow, subscriberDots, pendingDots, releaseDots;
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
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 4:
                        // we will get 3 dots with current curve
                        _a.sent();
                        dots = 3;
                        dotsForEscrow = 2;
                        return [4 /*yield*/, bondage
                                .connect(arbiter)
                                .escrowDots(subscriber.address, oracle.address, specifier, dotsForEscrow)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, bondage
                                .connect(arbiter)
                                .releaseDots(subscriber.address, oracle.address, specifier, dotsForEscrow)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, bondage.getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 7:
                        subscriberDots = _a.sent();
                        expect(subscriberDots).to.equal(hardhat_1.ethers.BigNumber.from(dots - dotsForEscrow));
                        return [4 /*yield*/, bondage.getNumEscrow(subscriber.address, oracle.address, specifier)];
                    case 8:
                        pendingDots = _a.sent();
                        expect(pendingDots).to.equal(hardhat_1.ethers.BigNumber.from(0));
                        return [4 /*yield*/, bondage.getBoundDots(oracle.address, oracle.address, specifier)];
                    case 9:
                        releaseDots = _a.sent();
                        expect(releaseDots).to.equal(hardhat_1.ethers.BigNumber.from(dotsForEscrow));
                        return [2 /*return*/];
                }
            });
        });
    });
    it("BONDAGE_16 - releaseDots() - Check that operator can't release dots if trying to release more dots than escrowed", function () {
        return __awaiter(this, void 0, void 0, function () {
            var dots, dotsForEscrow;
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
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 4:
                        // we will get 3 dots with current curve
                        _a.sent();
                        dots = 3;
                        dotsForEscrow = 2;
                        return [4 /*yield*/, bondage
                                .connect(arbiter)
                                .escrowDots(subscriber.address, oracle.address, specifier, dotsForEscrow)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, expect(bondage
                                .connect(arbiter)
                                .releaseDots(subscriber.address, oracle.address, specifier, dotsForEscrow + 2)).to.reverted];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_17 - getDotsIssued() - Check that issued dots will increase with every bond', function () {
        return __awaiter(this, void 0, void 0, function () {
            var issuedDots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 3:
                        // we will get 3 dots with current curve
                        _a.sent();
                        // get another dot
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 1)];
                    case 4:
                        // get another dot
                        _a.sent();
                        return [4 /*yield*/, bondage.getDotsIssued(oracle.address, specifier)];
                    case 5:
                        issuedDots = _a.sent();
                        expect(issuedDots).to.equal(hardhat_1.ethers.BigNumber.from(4));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_18 - getDotsIssued() - Check that issued dots will decrease with every unbond', function () {
        return __awaiter(this, void 0, void 0, function () {
            var issuedDots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 3:
                        // we will get 3 dots with current curve
                        _a.sent();
                        // and another to get 4 dots total
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 1)];
                    case 4:
                        // and another to get 4 dots total
                        _a.sent();
                        return [4 /*yield*/, bondage.connect(subscriber).unbond(oracle.address, specifier, 1)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, bondage.getDotsIssued(oracle.address, specifier)];
                    case 6:
                        issuedDots = _a.sent();
                        expect(issuedDots).to.equal(hardhat_1.ethers.BigNumber.from(3));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_19 - bond() - Check bond function', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        expect(bondage.connect(subscriber).bond(oracle.address, specifier, approveTokens)).to.reverted;
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_20 - delegateBond() - Check that delegate bond can be executed', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(escrower)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, zapToken.connect(escrower).approve(bondage.address, approveTokens)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, bondage
                                .connect(escrower)
                                .delegateBond(subscriber.address, oracle.address, specifier, dotBound)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_21 - returnDots() - Check that dots can be returned', function () {
        return __awaiter(this, void 0, void 0, function () {
            var dots, dotsForEscrow, dotsForReturn, subscriberDots, escrowDots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(subscriber)];
                    case 3:
                        _a.sent();
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 4:
                        // we will get 3 dots with current curve
                        _a.sent();
                        dots = 3;
                        dotsForEscrow = 2;
                        dotsForReturn = 1;
                        return [4 /*yield*/, bondage
                                .connect(arbiter)
                                .escrowDots(subscriber.address, oracle.address, specifier, dotsForEscrow)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, bondage.getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 6:
                        subscriberDots = _a.sent();
                        console.log('SubScriber Dots', subscriberDots.toString());
                        return [4 /*yield*/, bondage
                                .connect(arbiter)
                                .returnDots(subscriber.address, oracle.address, specifier, 1)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, bondage.getBoundDots(subscriber.address, oracle.address, specifier)];
                    case 8:
                        subscriberDots = _a.sent();
                        console.log('SubScriber Dots', subscriberDots.toString());
                        expect(subscriberDots).to.equal(hardhat_1.ethers.BigNumber.from(dots - dotsForEscrow + dotsForReturn));
                        return [4 /*yield*/, bondage.getNumEscrow(subscriber.address, oracle.address, specifier)];
                    case 9:
                        escrowDots = _a.sent();
                        console.log('Escrow Dots', subscriberDots.toString());
                        expect(escrowDots).to.equal(hardhat_1.ethers.BigNumber.from(dotsForEscrow - dotsForReturn));
                        return [2 /*return*/];
                }
            });
        });
    });
    it("BONDAGE_22 - returnDots() - Check that more dots can't be returned than already escrowed", function () {
        return __awaiter(this, void 0, void 0, function () {
            var dots, dotsForEscrow, dotsForReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(subscriber)];
                    case 3:
                        _a.sent();
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 4:
                        // we will get 3 dots with current curve
                        _a.sent();
                        dots = 3;
                        dotsForEscrow = 2;
                        dotsForReturn = 1;
                        return [4 /*yield*/, bondage
                                .connect(arbiter)
                                .escrowDots(subscriber.address, oracle.address, specifier, dotsForEscrow)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, expect(bondage.returnDots(subscriber.address, oracle.address, specifier, dotsForEscrow + 1)).to.reverted];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("BONDAGE_23 - returnDots() - Check that more dots can't be called by someone who isn't the owner", function () {
        return __awaiter(this, void 0, void 0, function () {
            var dots, dotsForEscrow, dotsForReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 3:
                        // we will get 3 dots with current curve
                        _a.sent();
                        dots = 3;
                        dotsForEscrow = 2;
                        dotsForReturn = 1;
                        return [4 /*yield*/, bondage
                                .connect(arbiter)
                                .escrowDots(subscriber.address, oracle.address, specifier, dotsForEscrow)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, expect(bondage
                                .connect(arbiter)
                                .returnDots(subscriber.address, oracle.address, specifier, dotsForEscrow + 1)).to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_24 - bond() - Check that broker can bond to its endpoint', function () {
        return __awaiter(this, void 0, void 0, function () {
            var testBroker, savedBroker, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, zapToken.connect(owner).allocate(oracle.address, tokensForOwner)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, zapToken.connect(oracle).approve(bondage.address, approveTokens)];
                    case 2:
                        _a.sent();
                        testBroker = oracle;
                        return [4 /*yield*/, registry.connect(oracle).initiateProvider(publicKey, title)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, registry
                                .connect(oracle)
                                .initiateProviderCurve(specifier, piecewiseFunction, testBroker.address)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, registry.getEndpointBroker(oracle.address, specifier)];
                    case 5:
                        savedBroker = _a.sent();
                        // with current linear curve (startValue = 1, multiplier = 2) number of dots received should be equal to 5
                        return [4 /*yield*/, bondage.connect(oracle).bond(oracle.address, specifier, 3)];
                    case 6:
                        // with current linear curve (startValue = 1, multiplier = 2) number of dots received should be equal to 5
                        _a.sent();
                        return [4 /*yield*/, bondage.getZapBound(oracle.address, specifier)];
                    case 7:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(28));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_25 - bond() - Check that nonbroker cannot bond to broker endpoint', function () {
        return __awaiter(this, void 0, void 0, function () {
            var savedBroker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, zapToken.connect(owner).allocate(subscriber.address, tokensForOwner)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, registry.connect(oracle).initiateProvider(publicKey, title)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, registry
                                .connect(oracle)
                                .initiateProviderCurve(specifier, piecewiseFunction, oracle.address)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, registry.getEndpointBroker(oracle.address, specifier)];
                    case 4:
                        savedBroker = _a.sent();
                        return [4 /*yield*/, expect(bondage.connect(subscriber).bond(oracle.address, specifier, 3))
                                .to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('BONDAGE_26 - bond() - Check registry.clearEndpoint cannot be applied to a bonded curve', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prepareTokens(subscriber)];
                    case 3:
                        _a.sent();
                        // we will get 3 dots with current curve
                        return [4 /*yield*/, bondage.connect(subscriber).bond(oracle.address, specifier, 3)];
                    case 4:
                        // we will get 3 dots with current curve
                        _a.sent();
                        return [4 /*yield*/, expect(registry.connect(oracle).clearEndpoint(specifier)).to.reverted];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe('CurrentCost Test', function () {
    var zapToken;
    var dataBase;
    var bondage;
    var cost;
    var registry;
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
    var curveParams1 = [3, 0, 0, 2, 1000];
    // 1 + 2 x + 3 x ^ 2 on [1, 1000]
    var curveParams2 = [3, 1, 2, 3, 1000];
    // 10 on [1, 1000]
    var curveParams3 = [1, 10, 1000];
    // 1 + 2 x + 3 x ^ 2 on [1, 10]
    // 2 on [10, 20]
    var curveParams4 = [3, 1, 2, 3, 10, 1, 2, 20];
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var zapTokenFactory, coordinatorFactory, dbFactory, registryFactory, costFactory, bondFactory;
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
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Bondage', signers[0])];
                case 7:
                    bondFactory = _a.sent();
                    return [4 /*yield*/, zapTokenFactory.deploy()];
                case 8:
                    zapToken = (_a.sent());
                    return [4 /*yield*/, zapToken.deployed()];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, coordinatorFactory.deploy()];
                case 10:
                    coordinator = (_a.sent());
                    return [4 /*yield*/, coordinator.deployed()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, dbFactory.deploy()];
                case 12:
                    dataBase = (_a.sent());
                    return [4 /*yield*/, costFactory.deploy(coordinator.address)];
                case 13:
                    cost = (_a.sent());
                    return [4 /*yield*/, cost.deployed()];
                case 14:
                    _a.sent();
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
                    return [4 /*yield*/, coordinator.updateAllDependencies()];
                case 24:
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
                    case 0: 
                    //   console.log("init provider")
                    return [4 /*yield*/, registry.connect(account).initiateProvider(publicKey, title)];
                    case 1:
                        //   console.log("init provider")
                        _a.sent();
                        //console.log("init curve")
                        return [4 /*yield*/, registry
                                .connect(account)
                                .initiateProviderCurve(specifier, curveParams, zeroAddress)];
                    case 2:
                        //console.log("init curve")
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
    it('CURRENT_COST_1 - _currentCostOfDot() - Check current cost for function 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            var dotNumber, structure, dotcost, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider(oracle, curveParams1)];
                    case 1:
                        _a.sent();
                        dotNumber = 3;
                        structure = structurizeCurve(curveParams1);
                        dotcost = calcNextDotCost(structure, dotNumber);
                        return [4 /*yield*/, cost._currentCostOfDot(oracle.address, specifier, dotNumber)];
                    case 2:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(dotcost));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('CURRENT_COST_2 - _currentCostOfDot() - Check current cost for function 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            var dotNumber, structure, dotcost, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider(oracle, curveParams2)];
                    case 1:
                        _a.sent();
                        dotNumber = 3;
                        structure = structurizeCurve(curveParams2);
                        dotcost = calcNextDotCost(structure, dotNumber);
                        return [4 /*yield*/, cost._currentCostOfDot(oracle.address, specifier, dotNumber)];
                    case 2:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(dotcost));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('CURRENT_COST_3 - _currentCostOfDot() - Check current cost for function 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            var dotNumber, structure, dotcost, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider(oracle, curveParams3)];
                    case 1:
                        _a.sent();
                        dotNumber = 3;
                        structure = structurizeCurve(curveParams3);
                        dotcost = calcNextDotCost(structure, dotNumber);
                        return [4 /*yield*/, cost._currentCostOfDot(oracle.address, specifier, dotNumber)];
                    case 2:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(dotcost));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('CURRENT_COST_4 - _currentCostOfDot() - Check current cost for function 4', function () {
        return __awaiter(this, void 0, void 0, function () {
            var dotNumber, structure, dotcost, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider(oracle, curveParams4)];
                    case 1:
                        _a.sent();
                        dotNumber = 3;
                        structure = structurizeCurve(curveParams4);
                        dotcost = calcNextDotCost(structure, dotNumber);
                        return [4 /*yield*/, cost._currentCostOfDot(oracle.address, specifier, dotNumber)];
                    case 2:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(dotcost));
                        return [2 /*return*/];
                }
            });
        });
    });
    it('CURRENT_COST_5 - _costOfNDots() - Check cost of n-dots for function 4', function () {
        return __awaiter(this, void 0, void 0, function () {
            var dotNumber, structure, dotcost, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prepareProvider(oracle, curveParams4)];
                    case 1:
                        _a.sent();
                        dotNumber = 20;
                        structure = structurizeCurve(curveParams4);
                        dotcost = calcDotsCost(structure, dotNumber);
                        return [4 /*yield*/, cost._costOfNDots(oracle.address, specifier, 1, dotNumber - 1)];
                    case 2:
                        res = _a.sent();
                        expect(res).to.equal(hardhat_1.ethers.BigNumber.from(dotcost));
                        return [2 /*return*/];
                }
            });
        });
    });
});
