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
var utils_1 = require("ethers/lib/utils");
var mocha_1 = require("mocha");
chai_1.default.use(ethereum_waffle_1.solidity);
var expect = chai_1.default.expect;
var zapToken;
var db;
var key;
var owner;
var add1;
//TODO: Write tests incorporating the "storageOnly" guard condition for the setter functions
mocha_1.beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    var database;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
            case 1:
                // Test accounts
                _a = _b.sent(), owner = _a[0], add1 = _a[1];
                return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Database')];
            case 2:
                database = _b.sent();
                return [4 /*yield*/, database.deploy()];
            case 3:
                db = (_b.sent());
                return [4 /*yield*/, db.setStorageContract(owner.address, true)];
            case 4:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Database_Deployment', function () {
    it('owner() - Check if the owner is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, db.owner()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).to.equal(owner.address);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Database_Transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('setStorageContract() - Check if the event "StorageModified"' +
            ' is emitted after the owner calls the function', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(db.setStorageContract(add1.address, true))
                            .to.emit(db, 'StorageModified')
                            .withArgs(add1.address, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('setStorageContract() - Fails if anyone but the owner runs the function', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transaction, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .connect(add1)
                                .setStorageContract(owner.address, true)];
                    case 1:
                        transaction = _a.sent();
                        expect(transaction).to.be.an('error');
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        expect(err_1).to.be.an('error');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('setStorageContract() - Succeeds when the owner of the contract calls the function', function () { return __awaiter(void 0, void 0, void 0, function () {
            var transaction, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .connect(owner)
                                .setStorageContract(add1.address, true)];
                    case 1:
                        transaction = _a.sent();
                        expect(transaction).to.have.property('hash');
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        expect(err_2).to.have.property('hash');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('setBytes32() - Tests if a byte can be set in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_byte_val, transaction, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_byte_val = utils_1.formatBytes32String('2');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, db.setBytes32(input_byte_key, input_byte_val)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getBytes32(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_byte_val.toString());
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        expect(err_3).to.equal(input_byte_val.toString());
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it('setNumber() - Tests if a number can be set in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_number_val, transaction, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_number_val = 2;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, db.setNumber(input_byte_key, input_number_val)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getNumber(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction).to.equal(input_number_val);
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        expect(err_4).to.equal(input_number_val);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it('setBytes() - Tests if a byte can be set in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_byte_val, transaction, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_byte_val = utils_1.formatBytes32String('2');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, db.setBytes(input_byte_key, input_byte_val)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getBytes(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_byte_val.toString());
                        return [3 /*break*/, 5];
                    case 4:
                        err_5 = _a.sent();
                        expect(err_5).to.equal(input_byte_val.toString());
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it('setIntArray() - Tests if an int array can be set in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_int_array, transaction, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_int_array = [1, 2];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, db.setIntArray(input_byte_key, input_int_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getIntArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_int_array.toString());
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        expect(err_6).to.equal(input_int_array);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it('setIntArrayIndex() - Tests if an int array can be overwritten in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_int_array, input_int_val, test_index, transaction, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_int_array = [1];
                        input_int_val = 2;
                        test_index = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, db.setIntArray(input_byte_key, input_int_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getIntArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_int_array.toString());
                        return [4 /*yield*/, db.setIntArrayIndex(input_byte_key, test_index, input_int_val)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.getIntArray(input_byte_key)];
                    case 5:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_int_val.toString());
                        return [3 /*break*/, 7];
                    case 6:
                        err_7 = _a.sent();
                        expect(err_7).to.equal(input_int_val);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        it('setIntArrayIndex() - Tests if an int array fails when an out of bounds index is overwritten', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_int_array, input_int_val, test_index, transaction, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_int_array = [1];
                        input_int_val = 2;
                        test_index = 1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, db.setIntArray(input_byte_key, input_int_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getIntArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_int_array.toString());
                        return [4 /*yield*/, db.setIntArrayIndex(input_byte_key, test_index, input_int_val)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.getIntArray(input_byte_key)];
                    case 5:
                        transaction = _a.sent();
                        expect(transaction).to.be.an('error');
                        return [3 /*break*/, 7];
                    case 6:
                        err_8 = _a.sent();
                        expect(err_8).to.be.an('error');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        it('pushIntArray() - Tests if an int array can be pushed to in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_int_array, input_int_val, final_output_int_array, transaction, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_int_array = [1];
                        input_int_val = 2;
                        final_output_int_array = [1, 2];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, db.setIntArray(input_byte_key, input_int_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getIntArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_int_array.toString());
                        return [4 /*yield*/, db.pushIntArray(input_byte_key, input_int_val)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.getIntArray(input_byte_key)];
                    case 5:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(final_output_int_array.toString());
                        return [3 /*break*/, 7];
                    case 6:
                        err_9 = _a.sent();
                        expect(err_9).to.equal(final_output_int_array);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        it('setBytesArray() - Tests if an byte array can be set in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_byte_array, transaction, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_byte_array = [
                            utils_1.formatBytes32String('a'),
                            utils_1.formatBytes32String('b')
                        ];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, db.setBytesArray(input_byte_key, input_byte_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getBytesArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(JSON.stringify(transaction)).to.equal(JSON.stringify(input_byte_array));
                        return [3 /*break*/, 5];
                    case 4:
                        err_10 = _a.sent();
                        expect(err_10).to.equal(input_byte_array);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it('setBytesArrayIndex() - Tests if an byte array can be overwritten in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_byte_array, input_byte_val, test_index, transaction, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_byte_array = [utils_1.formatBytes32String('a')];
                        input_byte_val = utils_1.formatBytes32String('b');
                        test_index = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, db.setBytesArray(input_byte_key, input_byte_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getBytesArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_byte_array.toString());
                        return [4 /*yield*/, db.setBytesArrayIndex(input_byte_key, test_index, input_byte_val)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.getBytesArray(input_byte_key)];
                    case 5:
                        transaction = _a.sent();
                        expect(JSON.stringify(transaction)).to.equal(JSON.stringify([input_byte_val]));
                        return [3 /*break*/, 7];
                    case 6:
                        err_11 = _a.sent();
                        expect(err_11).to.equal(input_byte_val);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        it('setBytesArrayIndex() - Tests if an byte array fails when an out of bounds index is overwritten', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_byte_array, input_byte_val, test_index, transaction, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_byte_array = [utils_1.formatBytes32String('a')];
                        input_byte_val = utils_1.formatBytes32String('b');
                        test_index = 1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, db.setBytesArray(input_byte_key, input_byte_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getBytesArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_byte_array.toString());
                        return [4 /*yield*/, db.setBytesArrayIndex(input_byte_key, test_index, input_byte_val)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.getBytesArray(input_byte_key)];
                    case 5:
                        transaction = _a.sent();
                        expect(transaction).to.be.an('error');
                        return [3 /*break*/, 7];
                    case 6:
                        err_12 = _a.sent();
                        expect(err_12).to.be.an('error');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        it('pushBytesArray() - Tests if an byte array can be pushed to in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_byte_array, input_byte_val, final_output_byte_array, transaction, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_byte_array = [utils_1.formatBytes32String('a')];
                        input_byte_val = utils_1.formatBytes32String('b');
                        final_output_byte_array = [
                            utils_1.formatBytes32String('a'),
                            utils_1.formatBytes32String('b')
                        ];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, db.setBytesArray(input_byte_key, input_byte_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getBytesArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_byte_array.toString());
                        return [4 /*yield*/, db.pushBytesArray(input_byte_key, input_byte_val)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.getBytesArray(input_byte_key)];
                    case 5:
                        transaction = _a.sent();
                        expect(JSON.stringify(transaction)).to.equal(JSON.stringify(final_output_byte_array));
                        return [3 /*break*/, 7];
                    case 6:
                        err_13 = _a.sent();
                        expect(err_13).to.equal(final_output_byte_array);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        it('setAddressArray() - Tests if an address array can be set in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_address_array, transaction, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_address_array = [hardhat_1.ethers.constants.AddressZero];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, db.setAddressArray(input_byte_key, input_address_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getAddressArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(JSON.stringify(transaction)).to.equal(JSON.stringify(input_address_array));
                        return [3 /*break*/, 5];
                    case 4:
                        err_14 = _a.sent();
                        expect(err_14).to.equal(input_address_array);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        it('setAddressArrayIndex() - Tests if an address array can be overwritten in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_address_array, input_address_val, test_index, transaction, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_address_array = [hardhat_1.ethers.constants.AddressZero];
                        input_address_val = add1.address;
                        test_index = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, db.setAddressArray(input_byte_key, input_address_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getAddressArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_address_array.toString());
                        return [4 /*yield*/, db.setAddressArrayIndex(input_byte_key, test_index, input_address_val)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.getAddressArray(input_byte_key)];
                    case 5:
                        transaction = _a.sent();
                        expect(JSON.stringify(transaction)).to.equal(JSON.stringify([input_address_val]));
                        return [3 /*break*/, 7];
                    case 6:
                        err_15 = _a.sent();
                        expect(err_15).to.equal(input_address_val);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        it('setAddressArrayIndex() - Tests if an byte array fails when an out of bounds index is overwritten', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_address_array, input_address_val, test_index, transaction, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_address_array = [hardhat_1.ethers.constants.AddressZero];
                        input_address_val = add1.address;
                        test_index = 1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, db.setAddressArray(input_byte_key, input_address_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getAddressArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_address_array.toString());
                        return [4 /*yield*/, db.setAddressArrayIndex(input_byte_key, test_index, input_address_val)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.getAddressArray(input_byte_key)];
                    case 5:
                        transaction = _a.sent();
                        expect(transaction).to.be.an('error');
                        return [3 /*break*/, 7];
                    case 6:
                        err_16 = _a.sent();
                        expect(err_16).to.be.an('error');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        it('pushAddressArray() - Tests if an address array can be pushed to in the DB', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input_byte_key, input_address_array, input_address_val, final_output_address_array, transaction, err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input_byte_key = utils_1.formatBytes32String('1');
                        input_address_array = [hardhat_1.ethers.constants.AddressZero];
                        input_address_val = add1.address;
                        final_output_address_array = [
                            hardhat_1.ethers.constants.AddressZero,
                            add1.address
                        ];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, db.setAddressArray(input_byte_key, input_address_array)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db.getAddressArray(input_byte_key)];
                    case 3:
                        transaction = _a.sent();
                        expect(transaction.toString()).to.equal(input_address_array.toString());
                        return [4 /*yield*/, db.pushAddressArray(input_byte_key, input_address_val)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, db.getAddressArray(input_byte_key)];
                    case 5:
                        transaction = _a.sent();
                        expect(JSON.stringify(transaction)).to.equal(JSON.stringify(final_output_address_array));
                        return [3 /*break*/, 7];
                    case 6:
                        err_17 = _a.sent();
                        expect(err_17).to.equal(final_output_address_array);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
