import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export async function generateJWT(userId: string, email: string) {
  return jwt.sign(
    { userId, email }, 
    process.env.JWT_KEY, 
    { expiresIn: process.env.JWT_LIFETIME }
  );
}

