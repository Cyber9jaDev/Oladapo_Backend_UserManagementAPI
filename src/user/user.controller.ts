import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { UserResponseDto } from './dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('role') role?: Role,
  ): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }
}
