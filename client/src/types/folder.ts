export interface FolderState {
  folders: FolderItems[];
}

export enum FolderActionTypes {
  FETCH_FOLDERS = "FETCH_FOLDERS",
  UPDATE_FOLDER = "UPDATE_FOLDER",
  DELETE_FOLDER = "DELETE_FOLDER",
  CREATE_FOLDER = "CREATE_FOLDER",
}

export interface FolderProps extends FolderItems {
  activeClassName: string | null;
  setActiveClassName: (id: string | null) => void;
}

export interface FolderItems {
  id: string;
  name: string;
  pinned: boolean;
  userID: string;
}
interface FolderActionFetch {
  type: FolderActionTypes.FETCH_FOLDERS;
  payload: FolderItems[];
}

interface FolderActionDelete {
  type: FolderActionTypes.DELETE_FOLDER;
  payload: string;
}

export interface FolderResponse {
  name: string;
  pinned: boolean;
}

interface FolderActionUpdate {
  type: FolderActionTypes.UPDATE_FOLDER;
  payload: FolderItems;
}

interface FolderActionCreate {
  type: FolderActionTypes.CREATE_FOLDER;
  payload: FolderItems;
}
export type FolderAction =
  | FolderActionFetch
  | FolderActionUpdate
  | FolderActionDelete
  | FolderActionCreate;
