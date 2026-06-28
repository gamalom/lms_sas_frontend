import { Status } from "@/src/lib/types/types";

export interface IInstituteStudent {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhoneNumber: string;
  studentAddress: string;
  enrollmentDate: string;
  studentImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInitialInstituteStudentData {
  students: IInstituteStudent[];
  status: Status;
}

export interface IEditStudentPayload {
  id: string;
  data: Partial<Omit<IInstituteStudent, "id">>;
}
