import { Status } from "@/src/lib/types/types";

export interface IInstituteCourse {
  courseId: string;
  courseName: string;
  courseDuration: string;
  coursePrice: string;
  courseLevel: string;
  courseDescription: string;
  categoryId: string;
  courseThumbnail: string;
  catagoryName?: string;
  catagoryDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IInitialInstituteCourseData {
  courses: IInstituteCourse[];
  status: Status;
}

export interface IEditCoursePayload {
  id: string;
  data: Partial<Omit<IInstituteCourse, "courseId">>;
}
