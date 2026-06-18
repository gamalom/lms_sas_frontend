import { Status } from "@/src/lib/types/types";

export enum TeacherExpertise {
  PRO = "pro",
  INTERMIDATE = "intermidate",
  BIGNNIER = "beginner",
}

export interface IInstituteTeacherCourse {
  courseName: string;
  coursePrice: string;
}

export interface IInstituteTeacher {
  teacherName: string;
  teacherEmail: string;
  teacherPhoneNumber: string;
  teacherExpertise: TeacherExpertise;
  joiningDate: string;
  salary: number;
  courseId: string;
  teacherPhoto: string;
}
export interface IInstituteTeacherWithCourse extends IInstituteTeacher {
  course: IInstituteTeacherCourse;
}
export interface IInitialInstituteTeacherData {
  teacher: IInstituteTeacherWithCourse;
  status: Status;
}
