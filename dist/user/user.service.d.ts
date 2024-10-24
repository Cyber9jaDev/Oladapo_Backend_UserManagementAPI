import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dtos/user.dto';
import { UpdateUserInterface } from './interface/user.interface';
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
    updateUser(id: string, updateUserParams: UpdateUserInterface): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
