import { Status } from "../../types/types";

export interface IUserData {
  username: string;
  token: string;
}

export interface IInitialData {
  user: IUserData;
  status: Status;
}

export interface IRegisterData extends IUserData {
  email: string;
}
