import { UserAction, UserState, UserActionTypes } from "../../types/user";
const initialState: UserState = {
  isAuth: false,
  username: "",
  email: "",
  id: "",
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.AUTH_USER:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.AUTH_USER_SUCCES:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        isLoading: false,
        username: action.payload.username,
        email: action.payload.email,
        id: action.payload.id,
        error: null,
      };
    case UserActionTypes.AUTH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
