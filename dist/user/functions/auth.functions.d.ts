import { User } from '../interface/auth.interface';
export declare function generateToken(user: User): Promise<string>;
