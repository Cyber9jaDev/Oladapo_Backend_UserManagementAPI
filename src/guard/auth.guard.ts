import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from 'src/database/database.service';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export interface JWTPayload {
  userId: string;
  email: string;
  role:  Role
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = await this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no role assigned, go on and execute
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_KEY) as JWTPayload;
      const user = await this.databaseService.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) return false;

      return requiredRoles.includes(user.role);

    } catch (error) {
      return false;
    }
  }
}