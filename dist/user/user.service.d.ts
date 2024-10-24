import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dtos/user.dto';
import { UpdateUserInterface, UserEntity } from './interface/user.interface';
interface Filter {
    createdAt?: {
        gte?: Date;
        lte?: Date;
    };
    dateFrom?: Date;
    dateTo?: Date;
}
export declare class UserService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findUser(id: string): Promise<UserResponseDto>;
    findAllUsers(filter: Filter, take: number, skip: number): Promise<UserResponseDto[]>;
    updateUser(id: string, updateUserParams: UpdateUserInterface, user: UserEntity): Promise<{
        name: string;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
export {};
