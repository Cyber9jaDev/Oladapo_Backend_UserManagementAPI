import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserResponseDto } from './dtos/user.dto';
import { UpdateUserInterface, UserEntity } from './interface/user.interface';

interface Filter {
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
  dateFrom?: Date;
  dateTo?: Date;
}

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUser(id: string): Promise<UserResponseDto> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAllUsers(
    filter: Filter,
    take: number,
    skip: number,
  ): Promise<UserResponseDto[]> {
    return await this.databaseService.user.findMany({
      where: filter,
      take,
      skip,
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async updateUser(id: string, updateUserParams: UpdateUserInterface, user: UserEntity) {
    const userUpdated = await this.databaseService.user.update({
      where: { id },
      data: { ...updateUserParams },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!userUpdated) throw new BadRequestException();

    return userUpdated;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.databaseService.user.delete({
      where: { id },
    });

    if (!deletedUser) throw new BadRequestException();

    return { message: 'User deleted successfully' };
  }
}
