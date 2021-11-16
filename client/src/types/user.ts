export interface UserState {
  isAuth: boolean;
  username?: null | string;
  email: null | string;
  id: string;
  isLoading: boolean;
  error: string | null;
}

export interface IUser {
  email: string;
  username: string;
  id: string;
}

export enum UserActionTypes {
  AUTH_USER = "AUTH_USER",
  AUTH_USER_SUCCES = "AUTH_USER_SUCCESS",
  AUTH_USER_ERROR = "AUTH_USER_ERROR",
}

interface UserAuth {
  type: UserActionTypes.AUTH_USER;
}

interface UserAuthSucces {
  type: UserActionTypes.AUTH_USER_SUCCES;
  payload: UserState;
}

interface UserAuthError {
  type: UserActionTypes.AUTH_USER_ERROR;
  payload: string;
}

export type UserAction = UserAuth | UserAuthSucces | UserAuthError;
