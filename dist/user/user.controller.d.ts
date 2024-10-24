import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { UserResponseDto } from './dtos/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(id: string): Promise<UserResponseDto>;
    findAll(page?: string, limit?: string, dateFrom?: string, dateTo?: string, role?: Role): Promise<UserResponseDto[]>;
    updateOne(id: string): Promise<UserResponseDto>;
}
