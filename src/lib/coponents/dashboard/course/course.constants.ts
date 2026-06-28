import { IInstituteCourse } from "@/src/lib/store/institute/course/types.institute-courseSlice";

export const TABLE_COLUMNS = [
  { key: "courseThumbnail" as const, label: "Thumbnail" },
  { key: "courseName" as const, label: "Name" },
  { key: "courseLevel" as const, label: "Level" },
  { key: "catagoryName" as const, label: "Category" },
  { key: "coursePrice" as const, label: "Price" },
  { key: "courseDuration" as const, label: "Duration" },
  { key: "courseId" as const, label: "ID" },
];

export const COURSE_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

export const INITIAL_COURSE_FORM = {
  courseName: "",
  courseDescription: "",
  courseDuration: "",
  coursePrice: "",
  courseLevel: "beginner",
  categoryId: "",
};

export type CourseFormData = typeof INITIAL_COURSE_FORM;

export type CourseTableColumn = (typeof TABLE_COLUMNS)[number];

export function formatCreatedAt(value?: string) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const COURSES_PER_PAGE = 5;

export function paginateCourses<T>(
  items: T[],
  page: number,
  perPage = COURSES_PER_PAGE,
) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function getTotalPages(totalItems: number, perPage = COURSES_PER_PAGE) {
  return Math.max(1, Math.ceil(totalItems / perPage));
}

export function filterCourses(courses: IInstituteCourse[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return courses;

  return courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(normalizedQuery) ||
      course.courseId.toLowerCase().includes(normalizedQuery) ||
      (course.catagoryName?.toLowerCase().includes(normalizedQuery) ?? false),
  );
}

export function getCourseLevelLabel(value: string) {
  return (
    COURSE_LEVELS.find((level) => level.value === value)?.label ?? value
  );
}
