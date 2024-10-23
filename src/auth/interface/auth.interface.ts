import { Role } from "@prisma/client";

export interface AuthParams {
  name: string,
  email: string,
  password: string,
  role: Role
}

export interface User{
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: Role;
} 
