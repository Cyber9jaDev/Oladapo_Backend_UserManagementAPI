import { Body, Controller, Param, ParseEnumPipe, Post } from '@nestjs/common';
import { Role } from '@prisma/client';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';

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

  @Post('/login')
  async login( @Body() { email, password }: LoginDto ){
    return this.authService.login(email, password)
  }
}
