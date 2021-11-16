import { TodoAction, TodoActionTypes, TodoState } from "../../types/todos";

const initialState: TodoState = {
  isLoading: false,
  todos: [],
  error: null,
};

export const todoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODO:
      return {
        ...state,
        isLoading: action.payload,
      };
    case TodoActionTypes.FETCH_TODO_SUCCES:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case TodoActionTypes.FETCH_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case TodoActionTypes.CREATE_TODO:
      return {
        ...state,
        isLoading: action.payload,
      };
    case TodoActionTypes.CREATE_TODO_SUCCES:
      return {
        ...state,
        isLoading: false,
        todos: [...state.todos, action.payload],
      };
    case TodoActionTypes.CREATE_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case TodoActionTypes.UPDATE_TODO:
      return {
        ...state,
        isLoading: true,
      };
    case TodoActionTypes.UPDATE_TODO_SUCCES:
      const updatedTodo = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
      return {
        ...state,
        isLoading: false,
        todos: updatedTodo,
      };
    case TodoActionTypes.DELETE_TODO:
      return {
        ...state,
        isLoading: action.payload,
      };
    case TodoActionTypes.DELETE_TODO_SUCCES: {
      const updatedTodo = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return {
        ...state,
        isLoading: false,
        todos: updatedTodo,
      };
    }
    case TodoActionTypes.DELETE_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case TodoActionTypes.DELETE_TODOS_FOLDER: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TodoActionTypes.DELETE_TODOS_FOLDER_SUCCES: {
      const updatedTodo = state.todos.filter(
        (todo) => todo.folderID !== action.payload.folderId
      );
      return {
        ...state,
        isLoading: false,
        todos: updatedTodo,
      };
    }
    case TodoActionTypes.DELETE_TODOS_FOLDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
