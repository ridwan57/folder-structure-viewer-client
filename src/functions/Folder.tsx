import axios from "axios";
import { objResType } from "../Types/index";
type createType = {
  id: string
}
export const createFolder = async (body: { name: string, parent: string }) =>
  await axios.post<createType>(`${process.env.REACT_APP_API}/create-folder`, body);

export const getFolders = async () =>
  await axios.get<objResType>(`${process.env.REACT_APP_API}/folders`);

export const deleteFolder = async (folderId: string) =>
  await axios.delete(`${process.env.REACT_APP_API}/folder/${folderId}`);
