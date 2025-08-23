"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var base_ok_response_1 = require("../common/response/200/base-ok-response");
var is_exsits_1 = require("../common/helpers/is-exsits");
var crypto_1 = require("../common/helpers/crypto");
var otpGenerator = require("otp-generator");
var addMinutes_1 = require("../common/helpers/addMinutes");
var UserService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserService = _classThis = /** @class */ (function () {
        function UserService_1(userRepo, otpRepo, mailService) {
            this.userRepo = userRepo;
            this.otpRepo = otpRepo;
            this.mailService = mailService;
        }
        UserService_1.prototype.create = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var password, 
                /* confirm_password, */ username, email, phone_number, full_name, errors, otp, hashedPassword, newUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            password = createUserDto.password, username = createUserDto.username, email = createUserDto.email, phone_number = createUserDto.phone_number, full_name = createUserDto.full_name;
                            return [4 /*yield*/, (0, is_exsits_1.checkUniqueFields)(this.userRepo, {
                                    email: email,
                                    username: username,
                                    phone_number: phone_number,
                                })];
                        case 1:
                            errors = _a.sent();
                            if (errors.length > 0) {
                                throw new common_1.ConflictException(errors);
                            }
                            return [4 /*yield*/, this.newOtp({ email: email, full_name: full_name })];
                        case 2:
                            otp = _a.sent();
                            return [4 /*yield*/, bcrypt.hash(password, 7)];
                        case 3:
                            hashedPassword = _a.sent();
                            return [4 /*yield*/, this.userRepo.save(__assign(__assign({}, createUserDto), { hashed_password: hashedPassword }))];
                        case 4:
                            newUser = _a.sent();
                            return [2 /*return*/, new base_ok_response_1.BaseOkResponse(201, "New user created successfully", { newUser: newUser, otp: otp }, "data")];
                    }
                });
            });
        };
        UserService_1.prototype.newOtp = function (userEmailDto) {
            return __awaiter(this, void 0, void 0, function () {
                var email, full_name, otp, now, expiration_time, newOtpData, details, encodedData, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = userEmailDto.email, full_name = userEmailDto.full_name;
                            otp = otpGenerator.generate(6, {
                                upperCaseAlphabets: false,
                                lowerCaseAlphabets: false,
                                specialChars: false,
                            });
                            now = new Date();
                            expiration_time = (0, addMinutes_1.addMinutesToDate)(now, 5);
                            return [4 /*yield*/, this.otpRepo.delete({ email: email })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.otpRepo.save({
                                    otp: otp,
                                    email: email,
                                    expiration_time: expiration_time,
                                })];
                        case 2:
                            newOtpData = _a.sent();
                            details = {
                                timestamp: now,
                                email: email,
                                otp_id: newOtpData.id,
                            };
                            return [4 /*yield*/, (0, crypto_1.encode)(JSON.stringify(details))];
                        case 3:
                            encodedData = _a.sent();
                            console.log(full_name);
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.mailService.sendMail({ email: email, full_name: full_name, otp: otp })];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            error_1 = _a.sent();
                            console.log(error_1);
                            throw new common_1.ServiceUnavailableException("Emailga xat yuborishda xatolik", error_1.message);
                        case 7: return [2 /*return*/, {
                                message: "OTP emailga yuborildi",
                                verification_key: encodedData,
                            }];
                    }
                });
            });
        };
        UserService_1.prototype.verifyOtp = function (verifyOtpDto) {
            return __awaiter(this, void 0, void 0, function () {
                var verificationKey, email, otp, currentDate, decodedDate, details, resultOtp, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            verificationKey = verifyOtpDto.verificationKey, email = verifyOtpDto.email, otp = verifyOtpDto.otp;
                            currentDate = new Date();
                            return [4 /*yield*/, (0, crypto_1.decode)(verificationKey)];
                        case 1:
                            decodedDate = _a.sent();
                            details = JSON.parse(decodedDate);
                            if (details.email != email)
                                throw new common_1.BadRequestException("OTP bu eamilga yuborilmagan");
                            return [4 /*yield*/, this.otpRepo.findOneBy({ id: details.otp_id })];
                        case 2:
                            resultOtp = _a.sent();
                            if (resultOtp == null)
                                throw new common_1.BadRequestException("Bunday OTP yo'q");
                            if (resultOtp.verified)
                                throw new common_1.BadRequestException("OTP avval tekshirilgan");
                            if (resultOtp.expiration_time < currentDate)
                                throw new common_1.BadRequestException("Bu OTP'ning vaqti tugagan");
                            if (resultOtp.otp != otp)
                                throw new common_1.BadRequestException("OTP mos emas");
                            return [4 /*yield*/, this.userRepo.findOneBy({ email: email })];
                        case 3:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("User not found with email ".concat(email));
                            }
                            return [4 /*yield*/, this.userRepo.save(__assign(__assign({}, user), { is_active: true }))];
                        case 4:
                            _a.sent();
                            if (!user)
                                throw new common_1.BadRequestException("Bunday emaillik foydalanuvchi yo'q");
                            return [4 /*yield*/, this.otpRepo.update({ id: details.otp_id }, { verified: true })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, { message: "🎉 Tabriklayman, siz active bo'ldingiz" }];
                    }
                });
            });
        };
        UserService_1.prototype.findAll = function () {
            return this.userRepo.find();
        };
        UserService_1.prototype.activeUser = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var user;
                var id = _b.id;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            user = _c.sent();
                            if (user.is_active)
                                "User activated successfully";
                            return [4 /*yield*/, this.userRepo.save(__assign(__assign({}, user), { is_active: true }))];
                        case 2:
                            _c.sent();
                            return [2 /*return*/, "User activated successfully"];
                    }
                });
            });
        };
        UserService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepo.findOneBy({ id: id })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("User not found with ID ".concat(id));
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UserService_1.prototype.findOneUserByEmail = function (email) {
            return this.userRepo.findOneBy({ email: email });
        };
        UserService_1.prototype.update = function (id, user) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedUser, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = this.userRepo).save;
                            _c = [{}];
                            return [4 /*yield*/, this.findOne(id)];
                        case 1: return [4 /*yield*/, _b.apply(_a, [__assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_d.sent())])), user])])];
                        case 2:
                            updatedUser = _d.sent();
                            return [2 /*return*/, new base_ok_response_1.BaseOkResponse(200, "User with ID ".concat(id, " updated successfully"), updatedUser, "updatedUser")];
                    }
                });
            });
        };
        UserService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var deletedUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            deletedUser = _a.sent();
                            return [4 /*yield*/, this.userRepo.remove(deletedUser)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, new base_ok_response_1.BaseOkResponse(200, "User with ID ".concat(id, " deleted successfully"), deletedUser, "deletedUser")];
                    }
                });
            });
        };
        return UserService_1;
    }());
    __setFunctionName(_classThis, "UserService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserService = _classThis;
}();
exports.UserService = UserService;
