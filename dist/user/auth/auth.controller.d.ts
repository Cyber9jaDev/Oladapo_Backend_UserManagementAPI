import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { Role } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register({ name, email, password }: RegisterDto, role: Role): Promise<{
        token: string;
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login({ email, password }: LoginDto): Promise<{
        token: string;
        id: string;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
