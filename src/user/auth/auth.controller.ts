import { Body, Controller, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dtos/auth.dto';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register/:role')
  async register(
    @Body() { name, email, password }: RegisterDto,
    @Param('role', new ParseEnumPipe(Role)) role: Role,
  ) {
    return this.authService.register({ name, email, password, role });
  }
}
