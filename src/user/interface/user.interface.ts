import { Role } from "@prisma/client"

// User from JWT
export interface UserEntity {
  userId: string,
  name: string,
  role: Role,
  iat: number,
  exp: number
}

export interface UpdateUserInterface{
  name? : string,
}

