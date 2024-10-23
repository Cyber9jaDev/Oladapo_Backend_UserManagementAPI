import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AuthParams, JWTPayload, User } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  private async generateToken(user: User) {
    const payload: JWTPayload = { userId: user.id, email: user.email, role: user.role };
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.JWT_LIFETIME });
  }

  async register({ name, email, password, role }: AuthParams) {
    const userExists = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = await this.databaseService.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        role,
      },

      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      throw new BadRequestException('Error creating user');
    }

    const token = await this.generateToken(user);
    return { ...user, token };
  }

  async login(email: string, password: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, role: true, password: true },
    });

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    delete user.password;
    const token = await this.generateToken(user);
    return { ...user, token };
  }
}