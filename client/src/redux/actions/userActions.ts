import axios from "axios";
import { UserAction, UserActionTypes, UserState } from "./../../types/user";
import { Dispatch } from "react";
import api from "../../http/api";
import IUserData from "../../types/IUserInputData";
import { Auth } from "../../types/AuthResponse";

export const userAuth =
  (userData: IUserData, path: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.AUTH_USER });
      const { data } = await api.post<Auth>(path, userData);
      localStorage.setItem("token", data.accesToken);
      dispatch({
        type: UserActionTypes.AUTH_USER_SUCCES,
        payload: { ...data.user, isAuth: true },
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.AUTH_USER_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const checkAuth = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.AUTH_USER });
    const { data } = await axios.get<Auth>(
      `${process.env.REACT_APP_API_URL}/refresh`,
      { withCredentials: true }
    );
    localStorage.setItem("token", data.accesToken);
    dispatch({
      type: UserActionTypes.AUTH_USER_SUCCES,
      payload: { ...data.user, isAuth: true } as UserState,
    });
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.AUTH_USER_ERROR,
      payload: error.response.message,
    });
  }
};

export const userLogout = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    localStorage.removeItem("token");
    await api.post("/logout");
    dispatch({
      type: UserActionTypes.AUTH_USER_SUCCES,
      payload: { isAuth: false } as UserState,
    });
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.AUTH_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};
