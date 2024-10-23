import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dtos/user.dto';
export declare class UserService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    findOne(id: string): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
}
