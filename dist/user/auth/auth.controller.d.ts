import { AuthService } from './auth.service';
import { RegisterDto } from '../dtos/auth.dto';
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
}
