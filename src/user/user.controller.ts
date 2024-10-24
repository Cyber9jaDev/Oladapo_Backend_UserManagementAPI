import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { UpdateUserDto, UserResponseDto } from './dtos/user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './interface/user.interface';

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
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: UserEntity
  ): Promise<UserResponseDto> {
    // Find the user if it exi
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/id')
  async deleteUser(
    @Param("id") id: string,
  ){
    return this.userService.deleteUser(id);
  }



}
