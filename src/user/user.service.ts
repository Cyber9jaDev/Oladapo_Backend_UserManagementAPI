import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dtos/user.dto';

interface Filter{
  createdAt?: {
    gte?: Date;
    lte?: Date;
  },
  dateFrom?: Date,
  dateTo?: Date
}

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

  async findAll(filter: Filter, take: number, skip: number): Promise<UserResponseDto[]> {
    return await this.databaseService.user.findMany({
      where: filter,
      take,
      skip,
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async updateOne(){
    // return this.databaseService.user.update({
    //   where: {}
    // });

    return
  }
}
