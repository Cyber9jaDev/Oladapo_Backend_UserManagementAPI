import { Role } from '@prisma/client';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register({ name, email, password }: RegisterDto, role: Role): Promise<{
        token: string;
        name: string;
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login({ email, password }: LoginDto): Promise<{
        token: string;
        name: string;
        id: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
