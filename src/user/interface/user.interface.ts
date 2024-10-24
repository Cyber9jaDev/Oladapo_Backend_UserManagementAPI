
// User from JWT
export interface UserEntity {
  userId: string,
  name: string,
  iat: number,
  exp: number
}

export interface UpdateUserInterface{
  name? : string,
}
