"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { fetchInstituteCourse } from "@/src/lib/store/institute/course/courseSlice";
import { fetchInstituteTeacher } from "@/src/lib/store/institute/teacher/institute-teacherSlice";
import { IInstituteTeacher } from "@/src/lib/store/institute/teacher/types.institute-teacherSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { Status } from "@/src/lib/types/types";
import TableImage from "../table-image";
import { getExpertiseLabel } from "../teacher/teacher.constants";

const SELECTED_TEACHER_KEY = "selectedTeacherByCourse";

function readSelectedTeachers(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const stored = localStorage.getItem(SELECTED_TEACHER_KEY);
    return stored ? (JSON.parse(stored) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function persistSelectedTeachers(selections: Record<string, string>) {
  localStorage.setItem(SELECTED_TEACHER_KEY, JSON.stringify(selections));
}

function groupTeachersByCourse(
  teachers: IInstituteTeacher[],
  courses: { courseId: string; courseName: string }[],
) {
  const grouped = new Map<
    string,
    { courseName: string; teachers: IInstituteTeacher[] }
  >();

  for (const course of courses) {
    grouped.set(course.courseId, {
      courseName: course.courseName,
      teachers: [],
    });
  }

  for (const teacher of teachers) {
    const courseId = teacher.courseId;
    if (!courseId) continue;

    const existing = grouped.get(courseId);
    if (existing) {
      existing.teachers.push(teacher);
      continue;
    }

    grouped.set(courseId, {
      courseName: teacher.courseName ?? "Unknown course",
      teachers: [teacher],
    });
  }

  return Array.from(grouped.entries()).map(([courseId, value]) => ({
    courseId,
    courseName: value.courseName,
    teachers: value.teachers,
  }));
}

export default function StudentCourseTeachers() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { teachers, status: teacherStatus } = useAppSelector(
    (state) => state.teacher,
  );
  const { courses, status: courseStatus } = useAppSelector(
    (state) => state.course,
  );
  const [selectedByCourse, setSelectedByCourse] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setSelectedByCourse(readSelectedTeachers());
  }, []);

  useEffect(() => {
    if (!user.instituteId) return;

    dispatch(fetchInstituteTeacher());
    dispatch(fetchInstituteCourse());
  }, [dispatch, user.instituteId]);

  const coursesWithTeachers = useMemo(
    () => groupTeachersByCourse(teachers, courses),
    [teachers, courses],
  );

  function handleTeacherSelect(
    courseId: string,
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    const teacherId = event.target.value;
    setSelectedByCourse((prev) => {
      const next = { ...prev, [courseId]: teacherId };
      persistSelectedTeachers(next);
      return next;
    });
  }

  const loading =
    teacherStatus === Status.LOADING || courseStatus === Status.LOADING;
  const error = teacherStatus === Status.ERROR || courseStatus === Status.ERROR;

  if (!user.instituteId) {
    return (
      <p className="text-sm text-gray-600">
        Your account is not linked to an institute yet. Contact your institute
        admin to get access to courses and teachers.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-sm text-gray-500">Loading courses and teachers...</p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600">
        Failed to load course teachers. Make sure your account is linked to an
        institute.
      </p>
    );
  }

  if (courses.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No courses available yet. Check back once your institute adds courses.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Course Teachers</h2>
        <p className="mt-1 text-sm text-gray-600">
          View teachers for each course. When a course has more than one
          teacher, choose your preferred instructor.
        </p>
      </div>

      <div className="space-y-4">
        {coursesWithTeachers.map(
          ({ courseId, courseName, teachers: courseTeachers }) => {
            const selectedTeacherId =
              selectedByCourse[courseId] ?? courseTeachers[0]?.id ?? "";
            const selectedTeacher = courseTeachers.find(
              (teacher) => teacher.id === selectedTeacherId,
            );

            return (
              <div
                key={courseId}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {courseName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {courseTeachers.length} teacher
                      {courseTeachers.length === 1 ? "" : "s"} available
                    </p>
                  </div>

                  {courseTeachers.length > 1 && (
                    <div className="min-w-[220px]">
                      <label
                        htmlFor={`teacher-${courseId}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Choose teacher
                      </label>
                      <select
                        id={`teacher-${courseId}`}
                        value={selectedTeacherId}
                        onChange={(event) =>
                          handleTeacherSelect(courseId, event)
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                      >
                        {courseTeachers.map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.teacherName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {courseTeachers.length === 0 ? (
                  <p className="mt-3 text-sm text-gray-500">
                    No teacher assigned to this course yet.
                  </p>
                ) : (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {(courseTeachers.length > 1
                      ? courseTeachers.filter(
                          (teacher) => teacher.id === selectedTeacherId,
                        )
                      : courseTeachers
                    ).map((teacher) => (
                      <div
                        key={teacher.id}
                        className="flex items-center gap-3 rounded-md bg-gray-50 p-3"
                      >
                        <TableImage
                          src={teacher.teacherImage}
                          alt={teacher.teacherName}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {teacher.teacherName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {teacher.teacherEmail}
                          </p>
                          <p className="text-xs text-gray-500">
                            {getExpertiseLabel(
                              String(teacher.teacherExpertise),
                            )}
                          </p>
                        </div>
                      </div>
                    ))}

                    {courseTeachers.length > 1 && selectedTeacher && (
                      <p className="text-xs text-indigo-600 sm:col-span-2">
                        You selected {selectedTeacher.teacherName} for{" "}
                        {courseName}.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
