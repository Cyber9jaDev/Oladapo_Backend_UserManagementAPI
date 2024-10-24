import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from 'src/database/database.service';
import { Role } from '@prisma/client';
export interface JWTPayload {
    userId: string;
    email: string;
    role: Role;
    iat: number;
    exp: number;
}
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly databaseService;
    constructor(reflector: Reflector, databaseService: DatabaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
