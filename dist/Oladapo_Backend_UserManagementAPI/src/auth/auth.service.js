"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../src/database/database.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async generateToken(user) {
        const payload = { userId: user.id, email: user.email, role: user.role };
        return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.JWT_LIFETIME });
    }
    async register({ name, email, password, role }) {
        const userExists = await this.databaseService.user.findUnique({
            where: { email },
        });
        if (userExists) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password.trim(), 10);
        const user = await this.databaseService.user.create({
            data: {
                name: name.trim(),
                email: email.trim(),
                password: hashedPassword,
                role,
            },
            select: { id: true, name: true, email: true, role: true },
        });
        if (!user) {
            throw new common_1.BadRequestException('Error creating user');
        }
        const token = await this.generateToken(user);
        return { ...user, token };
    }
    async login(email, password) {
        const user = await this.databaseService.user.findUnique({
            where: { email },
            select: { id: true, name: true, email: true, role: true, password: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User does not exist!');
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        delete user.password;
        const token = await this.generateToken(user);
        return { ...user, token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map