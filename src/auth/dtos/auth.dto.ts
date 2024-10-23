import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  password: string
}