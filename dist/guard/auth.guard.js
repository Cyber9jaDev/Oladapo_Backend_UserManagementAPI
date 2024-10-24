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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const database_service_1 = require("../database/database.service");
const jwt = require("jsonwebtoken");
let AuthGuard = class AuthGuard {
    constructor(reflector, databaseService) {
        this.reflector = reflector;
        this.databaseService = databaseService;
    }
    async canActivate(context) {
        const requiredRoles = await this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY);
            const user = await this.databaseService.user.findUnique({
                where: { id: payload.userId },
            });
            if (!user)
                return false;
            return requiredRoles.includes(user.role);
        }
        catch (error) {
            return false;
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        database_service_1.DatabaseService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map