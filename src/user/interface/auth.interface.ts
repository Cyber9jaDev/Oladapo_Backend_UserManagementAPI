import { Role } from "@prisma/client";

export interface AuthParams {
  name: string,
  email: string,
  password: string,
  role: Role
}