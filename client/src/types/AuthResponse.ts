import { UserState } from './user';
export interface Auth {
  accesToken: string,
  refreshToken: string
  user: UserState
}