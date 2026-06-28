import { IInstituteStudent } from "@/src/lib/store/institute/student/types.institute-studentSlice";

export const TABLE_COLUMNS = [
  { key: "studentImage" as const, label: "Photo" },
  { key: "studentName" as const, label: "Name" },
  { key: "studentEmail" as const, label: "Email" },
  { key: "studentPhoneNumber" as const, label: "Phone" },
  { key: "studentAddress" as const, label: "Address" },
  { key: "enrollmentDate" as const, label: "Enrollment Date" },
  { key: "id" as const, label: "ID" },
];

export const INITIAL_STUDENT_FORM = {
  studentName: "",
  studentEmail: "",
  studentPhoneNumber: "",
  studentAddress: "",
  enrollmentDate: "",
};

export type StudentFormData = typeof INITIAL_STUDENT_FORM;

export type StudentTableColumn = (typeof TABLE_COLUMNS)[number];

export const STUDENTS_PER_PAGE = 5;

export function paginateStudents<T>(
  items: T[],
  page: number,
  perPage = STUDENTS_PER_PAGE,
) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function getTotalPages(totalItems: number, perPage = STUDENTS_PER_PAGE) {
  return Math.max(1, Math.ceil(totalItems / perPage));
}

export function filterStudents(students: IInstituteStudent[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return students;

  return students.filter(
    (student) =>
      student.studentName.toLowerCase().includes(normalizedQuery) ||
      student.studentEmail.toLowerCase().includes(normalizedQuery) ||
      student.studentPhoneNumber.toLowerCase().includes(normalizedQuery) ||
      student.id.toLowerCase().includes(normalizedQuery),
  );
}
