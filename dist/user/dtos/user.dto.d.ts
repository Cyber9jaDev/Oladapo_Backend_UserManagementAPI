import { Role } from "@prisma/client";
export declare class UserResponseDto {
    id: string;
    name: string;
    email: string;
    role: Role;
}
