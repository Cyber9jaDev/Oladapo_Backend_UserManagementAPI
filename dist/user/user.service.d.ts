import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dtos/user.dto';
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
    findOne(id: string): Promise<UserResponseDto>;
    findAll(filter: Filter, take: number, skip: number): Promise<UserResponseDto[]>;
    updateOne(): Promise<void>;
}
export {};
