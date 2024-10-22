import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthParams } from '../interface/auth.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { generateJWT } from '../functions/auth.functions';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  // private generateJWT(userId: string, email: string) {
  //   return jwt.sign(
  //     { userId, email },
  //     process.env.JWT_KEY,
  //     { expiresIn: process.env.JWT_LIFETIME }
  //   );
  // }
  async register({ name, email, password, role }: AuthParams) {
    const userExists = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.databaseService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Error creating user');
    }

    const token = await generateJWT(user.id, user.email);
    return { ...user, token };
  }
}
