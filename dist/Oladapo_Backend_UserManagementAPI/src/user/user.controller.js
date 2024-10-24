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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const client_1 = require("@prisma/client");
const user_dto_1 = require("./dtos/user.dto");
const user_decorator_1 = require("./decorators/user.decorator");
const roles_decorator_1 = require("../../../src/decorators/roles.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findUser(id) {
        return this.userService.findUser(id);
    }
    async findAllUsers(page, limit, dateFrom, dateTo, role) {
        const createdAt = dateFrom || dateTo
            ? {
                ...(dateFrom && { gte: new Date(parseInt(dateFrom)) }),
                ...(dateTo && { lte: new Date(parseInt(dateTo)) }),
            }
            : undefined;
        const filter = {
            ...(createdAt && { createdAt }),
        };
        const take = limit ? Math.max(1, parseInt(limit)) : 10;
        const page_ = page ? Math.max(1, parseInt(page)) : 1;
        const skip = (page_ - 1) * take;
        return await this.userService.findAllUsers(filter, take, skip);
    }
    async updateUser(id, updateUserDto, user) {
        if (id !== user.userId && user.role !== client_1.Role.ADMIN) {
            throw new common_1.UnauthorizedException('You are not authorized to update this user');
        }
        return this.userService.updateUser(id, updateUserDto, user);
    }
    async deleteUser(id, user) {
        if (id !== user.userId && user.role !== client_1.Role.ADMIN) {
            throw new common_1.UnauthorizedException('You are not authorized to delete this account');
        }
        return this.userService.deleteUser(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('dateFrom')),
    __param(3, (0, common_1.Query)('dateTo')),
    __param(4, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map