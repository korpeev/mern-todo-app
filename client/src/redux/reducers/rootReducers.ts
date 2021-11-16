import { todoReducer } from "./todoReducer";
import { userReducer } from "./userReducer";
import { folderReducer } from "./folderReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  folderReducer,
  userReducer,
  todoReducer,
});
