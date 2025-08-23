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
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = encode;
exports.decode = decode;
var crypto = require("crypto");
var dotenv = require("dotenv");
dotenv.config();
var password = process.env.crypt_password;
var ivstring = Buffer.alloc(16);
function sha256(input) {
    return crypto.createHash("sha256").update(input).digest();
}
function password_derive_bytes(password, salt, iterations, len) {
    var key;
    key = Buffer.from(password + salt);
    for (var i = 0; i < iterations; i++) {
        key = sha256(key);
    }
    if (key.length < len) {
        var hx = password_derive_bytes(password, salt, iterations - 1, 20);
        for (var counter = 1; key.length < len; ++counter) {
            key = Buffer.concat([
                key,
                sha256(Buffer.concat([Buffer.from(counter.toString()), hx])),
            ]);
        }
    }
    return Buffer.alloc(len, key);
}
function encode(str) {
    return __awaiter(this, void 0, void 0, function () {
        var key, cipher, part1, part2, encrypted;
        return __generator(this, function (_a) {
            key = password_derive_bytes(password, "", 100, 32);
            cipher = crypto.createCipheriv("aes-256-cbc", key, ivstring);
            part1 = cipher.update(str, "utf8");
            part2 = cipher.final();
            encrypted = Buffer.concat([part1, part2]).toString("base64");
            return [2 /*return*/, encrypted];
        });
    });
}
function decode(str) {
    return __awaiter(this, void 0, void 0, function () {
        var key, decipher, decrypted;
        return __generator(this, function (_a) {
            key = password_derive_bytes(password, "", 100, 32);
            decipher = crypto.createDecipheriv("aes-256-cbc", key, ivstring);
            decrypted = decipher.update(str, "base64", "utf8");
            decrypted += decipher.final();
            return [2 /*return*/, decrypted];
        });
    });
}
