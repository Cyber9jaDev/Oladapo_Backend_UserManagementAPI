import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { UpdateUserDto, UserResponseDto } from './dtos/user.dto';
import { UserEntity } from './interface/user.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findUser(id: string): Promise<UserResponseDto>;
    findAllUsers(page?: string, limit?: string, dateFrom?: string, dateTo?: string, role?: Role): Promise<UserResponseDto[]>;
    updateUser(id: string, updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserResponseDto>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
