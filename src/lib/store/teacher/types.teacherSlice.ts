import { Status } from "../../types/types";

export interface ITeacher {
  teacherName: string;
  teacherEmail: string;
  teacherPhoneNumber: string;
  teacherExpertise: string;
  joiningDate: string;
  salary: number;
  courseId: string;
}

export interface IInitialTeacherData {
  teacher: ITeacher;
  status: Status;
}
