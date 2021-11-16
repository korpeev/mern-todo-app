import {
  FolderAction,
  FolderActionTypes,
  FolderResponse,
} from "./../../types/folder";
import { Dispatch } from "react";
import api from "../../http/api";

export const fetchFolders =
  (userId: string) => async (dispatch: Dispatch<FolderAction>) => {
    try {
      const response = await api.get(`/folder/${userId}`);
      dispatch({
        type: FolderActionTypes.FETCH_FOLDERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateFolder =
  (userId: string, id: string, payload: {}) =>
  async (dispath: Dispatch<FolderAction>) => {
    try {
      const response = await api.patch(`/folder/${userId}/${id}`, payload);
      dispath({
        type: FolderActionTypes.UPDATE_FOLDER,
        payload: response.data,
      });
    } catch (error) {}
  };

export const deleteFolder =
  (userId: string, id: string) => async (dispatch: Dispatch<FolderAction>) => {
    try {
      await api.delete(`/folder/${userId}/${id}`);
      dispatch({ type: FolderActionTypes.DELETE_FOLDER, payload: id });
    } catch (error) {}
  };

export const createFolder =
  (userId: string, folderData: FolderResponse) =>
  async (dispatch: Dispatch<FolderAction>) => {
    try {
      const response = await api.post(`/folder/${userId}`, folderData);
      dispatch({
        type: FolderActionTypes.CREATE_FOLDER,
        payload: response.data,
      });
    } catch (error) {}
  };
