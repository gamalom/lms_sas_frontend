import { Status } from "@/src/lib/types/types";

export interface IInstituteCourse {
  courseName: string;
  courseDuration: string;
  coursePrice: number;
  courseLevel: string;
  courseDescription: string;
  categoryId: string;
  courseThumbnaiol: string;
  courseId: string;
}

export interface IInitialInstituteCourseData {
  course: IInstituteCourse[];
  status: Status;
}
