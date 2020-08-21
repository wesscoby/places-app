
export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

export interface Payload {
  sub: string;
  email: string;
  role: Role
}