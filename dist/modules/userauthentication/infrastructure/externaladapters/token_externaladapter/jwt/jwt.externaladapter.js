"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtExternalAdapter = void 0;
const env_1 = __importDefault(require("@main/config/env"));
const ForbiddenError_1 = require("@modules/userauthentication/domain/errors/authenticate_error/ForbiddenError");
const inversify_1 = require("inversify");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("reflect-metadata");
let JwtExternalAdapter = class JwtExternalAdapter {
    constructor() {
        this.key = env_1.default.jwtSecurityKey;
    }
    generateToken(generateTokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ uid: generateTokenData.USER_UID }, this.key);
            return token;
        });
    }
    verifyToken(verifyTokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return jsonwebtoken_1.default.verify(verifyTokenData, this.key);
            }
            catch (error) {
                return new ForbiddenError_1.ForbiddenError();
            }
        });
    }
};
JwtExternalAdapter = __decorate([
    (0, inversify_1.injectable)()
], JwtExternalAdapter);
exports.JwtExternalAdapter = JwtExternalAdapter;
//# sourceMappingURL=jwt.externaladapter.js.map