import { Role } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserResponseDto{
  id: string;
  name: string;
  email: string;
  role: Role;
}

export class UpdateUserDto{
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}