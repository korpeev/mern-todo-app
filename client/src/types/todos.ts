import { FolderItems } from "./folder";
export interface TodoState {
  isLoading: boolean;
  todos: TodoResponse[];
  error: null | string;
}

export interface ITodoData {
  name: string;
  folderID?: string | undefined;
  userID: string;
}
export interface ITodoUpdateRequest {
  name?: string;
  complete?: boolean;
  updatedAt?: Date;
}

export interface TodoItemProps extends TodoResponse {
  currentFolder?: FolderItems;
}

export interface TodoResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date | null;
  complete: boolean;
  folderID: string;
  userID: string;
}

export enum TodoActionTypes {
  FETCH_TODO = "FETCH_TODO",
  FETCH_TODO_SUCCES = "FETCH_TODO_SUCCES",
  FETCH_TODO_ERROR = "FETCG_TODO_ERROR",
  DELETE_TODO = "DELETE_TODO",
  DELETE_TODO_SUCCES = "DELETE_TODO_SUCCES",
  DELETE_TODO_ERROR = "DELETE_TODO_ERROR",
  UPDATE_TODO = "UPDATE_TODO",
  UPDATE_TODO_SUCCES = "UPDATE_TODO_SUCCES",
  UPDATE_TODO_ERROR = "UPDATE_TODO_ERROR",
  CREATE_TODO = "CREATE_TODO",
  CREATE_TODO_SUCCES = "CREATE_TODO_SUCCES",
  CREATE_TODO_ERROR = "CREATE_TODO_ERROR",
  DELETE_TODOS_FOLDER = "DELETE_TODOS_FOLDER",
  DELETE_TODOS_FOLDER_SUCCES = "DELETE_TODOS_FOLDER_SUCCES",
  DELETE_TODOS_FOLDER_ERROR = "DELETE_TODOS_FOLDER_ERROR",
}

interface FetchTodo {
  type: TodoActionTypes.FETCH_TODO;
  payload: boolean;
}

interface FetchTodoSucces {
  type: TodoActionTypes.FETCH_TODO_SUCCES;
  payload: TodoResponse[];
}

interface FetchTodoError {
  type: TodoActionTypes.FETCH_TODO_ERROR;
  payload: string | null;
}

interface deleteTodo {
  type: TodoActionTypes.DELETE_TODO;
  payload: boolean;
}

interface deleteTodoSucces {
  type: TodoActionTypes.DELETE_TODO_SUCCES;
  payload: TodoResponse;
}

interface deleteTodoError {
  type: TodoActionTypes.DELETE_TODO_ERROR;
  payload: string | null;
}

interface updateTodo {
  type: TodoActionTypes.UPDATE_TODO;
  payload: boolean;
}

interface updateTodoSucces {
  type: TodoActionTypes.UPDATE_TODO_SUCCES;
  payload: TodoResponse;
}

interface updateTodoError {
  type: TodoActionTypes.UPDATE_TODO_ERROR;
  payload: string | null;
}

interface createTodo {
  type: TodoActionTypes.CREATE_TODO;
  payload: boolean;
}

interface createTodoSucces {
  type: TodoActionTypes.CREATE_TODO_SUCCES;
  payload: TodoResponse;
}

interface createTodoError {
  type: TodoActionTypes.CREATE_TODO_ERROR;
  payload: string | null;
}
interface deleteTodosByFolder {
  type: TodoActionTypes.DELETE_TODOS_FOLDER;
}

interface deleteTodosByFolderSucces {
  type: TodoActionTypes.DELETE_TODOS_FOLDER_SUCCES;
  payload: {
    folderId: string;
  };
}

interface deleteTodosByFolderError {
  type: TodoActionTypes.DELETE_TODOS_FOLDER_ERROR;
  payload: string | null;
}
export type TodoAction =
  | FetchTodo
  | FetchTodoError
  | FetchTodoSucces
  | deleteTodo
  | deleteTodoError
  | deleteTodoSucces
  | updateTodo
  | updateTodoSucces
  | updateTodoError
  | createTodo
  | createTodoSucces
  | createTodoError
  | deleteTodosByFolder
  | deleteTodosByFolderSucces
  | deleteTodosByFolderError;
