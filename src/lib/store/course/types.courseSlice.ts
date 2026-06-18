import { Status } from "../../types/types";

export interface ICourse {
  courseName: string;
  courseDuration: string;
  coursePrice: number;
  courseLevel: string;
  courseDescription: string;
  categoryId: string;
}

export interface IInitialState {
  course: ICourse;
  status: Status;
}
