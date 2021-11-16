import {
  FolderAction,
  FolderActionTypes,
  FolderState,
} from "../../types/folder";

const initalState: FolderState = {
  folders: [],
};

export const folderReducer = (
  state = initalState,
  action: FolderAction
): FolderState => {
  switch (action.type) {
    case FolderActionTypes.FETCH_FOLDERS:
      return {
        ...state,
        folders: action.payload,
      };
    case FolderActionTypes.UPDATE_FOLDER:
      const updatedFolder = state.folders.map((folder) =>
        folder.id === action.payload.id
          ? { ...folder, name: action.payload.name }
          : folder
      );

      return {
        ...state,
        folders: updatedFolder,
      };
    case FolderActionTypes.DELETE_FOLDER: {
      const updatedFolder = state.folders.filter(
        (folder) => folder.id !== action.payload
      );
      return {
        folders: updatedFolder,
      };
    }
    case FolderActionTypes.CREATE_FOLDER: {
      return {
        ...state,
        folders: [...state.folders, action.payload],
      };
    }
    default:
      return state;
  }
};
