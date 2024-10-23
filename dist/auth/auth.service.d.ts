import { DatabaseService } from 'src/database/database.service';
import { AuthParams } from './interface/auth.interface';
export declare class AuthService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    private generateToken;
    register({ name, email, password, role }: AuthParams): Promise<{
        token: string;
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
        id: string;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
