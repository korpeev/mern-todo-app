import {
  ITodoData,
  ITodoUpdateRequest,
  TodoAction,
  TodoActionTypes,
  TodoResponse,
} from "./../../types/todos";
import { Dispatch } from "react";
import api from "../../http/api";

export const fetchTodos =
  (userId: string) => async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionTypes.FETCH_TODO, payload: true });
      const response = await api.get<TodoResponse[]>(`/todos/${userId}`);
      dispatch({
        type: TodoActionTypes.FETCH_TODO_SUCCES,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: TodoActionTypes.FETCH_TODO_ERROR,
        payload: error.response.message,
      });
    }
  };

export const createTodo =
  (todoData: ITodoData) => async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionTypes.CREATE_TODO, payload: true });
      const response = await api.post<TodoResponse>(`/todos`, todoData);
      dispatch({
        type: TodoActionTypes.CREATE_TODO_SUCCES,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: TodoActionTypes.CREATE_TODO_ERROR,
        payload: error.response.message,
      });
    }
  };

export const fetchTodosByFolder =
  (userId: string, folderId: string) =>
  async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionTypes.FETCH_TODO, payload: true });
      const response = await api.get<TodoResponse[]>(
        `/todos/${userId}/${folderId}`
      );
      dispatch({
        type: TodoActionTypes.FETCH_TODO_SUCCES,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: TodoActionTypes.FETCH_TODO_ERROR,
        payload: error.response.message,
      });
    }
  };

export const updateTodo =
  (todoData: ITodoUpdateRequest, userId: string, id: string) =>
  async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionTypes.UPDATE_TODO, payload: true });
      const response = await api.patch<TodoResponse>(
        `/todos/${userId}/${id}`,
        todoData
      );
      dispatch({
        type: TodoActionTypes.UPDATE_TODO_SUCCES,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: TodoActionTypes.UPDATE_TODO_ERROR,
        payload: error.response.message,
      });
    }
  };

export const deleteTodo =
  (id: string) => async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionTypes.DELETE_TODO, payload: true });
      const response = await api.delete<TodoResponse>(`/todos/${id}`);
      dispatch({
        type: TodoActionTypes.DELETE_TODO_SUCCES,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: TodoActionTypes.DELETE_TODO_ERROR,
        payload: error.response.message,
      });
    }
  };

export const removeTodosByFolder =
  (folderId: string, userId: string) =>
  async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionTypes.DELETE_TODOS_FOLDER });
      await api.delete(`/todos/${userId}/${folderId}`);
      dispatch({
        type: TodoActionTypes.DELETE_TODOS_FOLDER_SUCCES,
        payload: { folderId },
      });
    } catch (error: any) {
      dispatch({
        type: TodoActionTypes.DELETE_TODOS_FOLDER_ERROR,
        payload: error.response.message,
      });
    }
  };
