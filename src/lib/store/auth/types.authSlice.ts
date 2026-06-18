import { Status } from "../../types/types";

export interface IUserData {
  username: string;
  password: string;
}

export interface IInitialData {
  user: IUserData;
  status: Status;
}
