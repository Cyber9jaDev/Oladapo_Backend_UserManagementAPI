import { DatabaseService } from 'src/database/database.service';
import { AuthParams } from '../interface/auth.interface';
export declare class AuthService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    register({ name, email, password, role }: AuthParams): Promise<{
        token: string;
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
