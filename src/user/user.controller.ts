import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { UpdateUserDto, UserResponseDto } from './dtos/user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './interface/user.interface';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findUser(id);
  }

  @Get()
  async findAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('role') role?: Role,
  ): Promise<UserResponseDto[]> {
    const createdAt =
      dateFrom || dateTo
        ? {
            ...(dateFrom && { gte: new Date(parseInt(dateFrom)) }),
            ...(dateTo && { lte: new Date(parseInt(dateTo)) }),
          }
        : undefined;

    const filter = {
      ...(createdAt && { createdAt }),
    };

    const take = limit ? Math.max(1, parseInt(limit)) : 10; // Ensure a positive limit or default to 10 items per page
    const page_ = page ? Math.max(1, parseInt(page)) : 1; // Ensure a positive page number or default to page 1
    const skip = (page_ - 1) * take;

    return await this.userService.findAllUsers(filter, take, skip);
  }

  @Put('/:id')
  @Roles(Role.ADMIN, Role.USER)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: UserEntity,
  ): Promise<UserResponseDto> {
    if (id !== user.userId && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        'You are not authorized to update this user',
      );
    }

    return this.userService.updateUser(id, updateUserDto, user);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN, Role.USER)
  async deleteUser(@Param('id') id: string, @User() user: UserEntity) {
    if (id !== user.userId && user.role !== Role.ADMIN) {
      throw new UnauthorizedException(
        'You are not authorized to delete this account',
      );
    }
    return this.userService.deleteUser(id);
  }
}
