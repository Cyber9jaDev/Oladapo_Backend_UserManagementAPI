import { Role } from "@prisma/client";
export declare class UserResponseDto {
    id: string;
    name: string;
    email: string;
    role: Role;
}
export declare class UpdateUserDto {
    name?: string;
}
