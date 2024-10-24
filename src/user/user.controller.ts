import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { UserResponseDto } from './dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Get()
  async findAll(
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

    return await this.userService.findAll(filter, take, skip);
  }

  @Put('/:id')
  async updateOne(
    @Param('id') id: string
  ): Promise<UserResponseDto> {
    return
    // return this.userService.updateOne()
  }

  



}
