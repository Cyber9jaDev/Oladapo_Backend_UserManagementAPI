import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.databaseService.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
  }
}
