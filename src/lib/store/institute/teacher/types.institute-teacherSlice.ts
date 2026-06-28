import { Status } from "@/src/lib/types/types";

export enum TeacherExpertise {
  PRO = "pro",
  INTERMIDATE = "intermidate",
  BIGNNIER = "beginner",
}

export interface IInstituteTeacher {
  id: string;
  teacherName: string;
  teacherEmail: string;
  teacherPhoneNumber: string;
  teacherExpertise: TeacherExpertise | string;
  joiningDate: string;
  salary: string | number;
  teacherImage?: string;
  courseId?: string;
  courseName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInitialInstituteTeacherData {
  teachers: IInstituteTeacher[];
  status: Status;
}

export interface IEditTeacherPayload {
  id: string;
  data: Partial<Omit<IInstituteTeacher, "id">>;
}
