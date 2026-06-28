import {
  IInstituteTeacher,
  TeacherExpertise,
} from "@/src/lib/store/institute/teacher/types.institute-teacherSlice";

export const TABLE_COLUMNS = [
  { key: "teacherImage" as const, label: "Photo" },
  { key: "teacherName" as const, label: "Name" },
  { key: "teacherEmail" as const, label: "Email" },
  { key: "teacherExpertise" as const, label: "Expertise" },
  { key: "courseName" as const, label: "Course" },
  { key: "joiningDate" as const, label: "Joining Date" },
  { key: "id" as const, label: "ID" },
];

export const EXPERTISE_OPTIONS = [
  { value: TeacherExpertise.BIGNNIER, label: "Beginner" },
  { value: TeacherExpertise.INTERMIDATE, label: "Intermediate" },
  { value: TeacherExpertise.PRO, label: "Pro" },
] as const;

export const INITIAL_TEACHER_FORM = {
  teacherName: "",
  teacherEmail: "",
  teacherPhoneNumber: "",
  teacherExpertise: TeacherExpertise.BIGNNIER,
  joiningDate: "",
  salary: "",
  courseId: "",
};

export type TeacherFormData = typeof INITIAL_TEACHER_FORM;

export type TeacherTableColumn = (typeof TABLE_COLUMNS)[number];

export function formatCreatedAt(value?: string) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const TEACHERS_PER_PAGE = 5;

export function paginateTeachers<T>(
  items: T[],
  page: number,
  perPage = TEACHERS_PER_PAGE,
) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function getTotalPages(totalItems: number, perPage = TEACHERS_PER_PAGE) {
  return Math.max(1, Math.ceil(totalItems / perPage));
}

export function filterTeachers(teachers: IInstituteTeacher[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return teachers;

  return teachers.filter(
    (teacher) =>
      teacher.teacherName.toLowerCase().includes(normalizedQuery) ||
      teacher.teacherEmail.toLowerCase().includes(normalizedQuery) ||
      teacher.id.toLowerCase().includes(normalizedQuery) ||
      (teacher.courseName?.toLowerCase().includes(normalizedQuery) ?? false),
  );
}

export function getExpertiseLabel(value: string) {
  return (
    EXPERTISE_OPTIONS.find((option) => option.value === value)?.label ?? value
  );
}
