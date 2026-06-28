"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  createInstituteTeacher,
  editInstituteTeacher,
} from "@/src/lib/store/institute/teacher/institute-teacherSlice";
import { IInstituteTeacher } from "@/src/lib/store/institute/teacher/types.institute-teacherSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import {
  EXPERTISE_OPTIONS,
  INITIAL_TEACHER_FORM,
  TeacherFormData,
} from "./teacher.constants";

export type TeacherModalMode = "create" | "edit";

type TeacherModalProps = {
  mode: TeacherModalMode;
  teacher?: IInstituteTeacher | null;
  onClose: () => void;
};

export default function TeacherModal({
  mode,
  teacher,
  onClose,
}: TeacherModalProps) {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.course);
  const [form, setForm] = useState<TeacherFormData>(INITIAL_TEACHER_FORM);
  const [teacherImage, setTeacherImage] = useState<File | null>(null);

  useEffect(() => {
    if (mode === "edit" && teacher) {
      setForm({
        teacherName: teacher.teacherName,
        teacherEmail: teacher.teacherEmail,
        teacherPhoneNumber: teacher.teacherPhoneNumber,
        teacherExpertise: teacher.teacherExpertise as TeacherFormData["teacherExpertise"],
        joiningDate: teacher.joiningDate
          ? new Date(teacher.joiningDate).toISOString().split("T")[0]
          : "",
        salary: String(teacher.salary ?? ""),
        courseId: teacher.courseId ?? "",
      });
      setTeacherImage(null);
      return;
    }

    setForm(INITIAL_TEACHER_FORM);
    setTeacherImage(null);
  }, [mode, teacher]);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setTeacherImage(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("teacherName", form.teacherName);
    formData.append("teacherEmail", form.teacherEmail);
    formData.append("teacherPhoneNumber", form.teacherPhoneNumber);
    formData.append("teacherExpertise", form.teacherExpertise);
    formData.append("joiningDate", form.joiningDate);
    formData.append("salary", form.salary);
    formData.append("courseId", form.courseId);

    if (teacherImage) {
      formData.append("teacherImage", teacherImage);
    } else if (mode === "edit" && teacher?.teacherImage) {
      formData.append("teacherImage", teacher.teacherImage);
    }

    if (mode === "create") {
      dispatch(createInstituteTeacher(formData));
    } else if (mode === "edit" && teacher) {
      dispatch(editInstituteTeacher(teacher.id, formData));
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">
          {mode === "create" ? "Add Teacher" : "Edit Teacher"}
        </h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="teacherName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="teacherName"
              name="teacherName"
              type="text"
              value={form.teacherName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="teacherEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="teacherEmail"
                name="teacherEmail"
                type="email"
                value={form.teacherEmail}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="teacherPhoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="teacherPhoneNumber"
                name="teacherPhoneNumber"
                type="tel"
                value={form.teacherPhoneNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="teacherExpertise"
              className="block text-sm font-medium text-gray-700"
            >
              Expertise
            </label>
            <select
              id="teacherExpertise"
              name="teacherExpertise"
              value={form.teacherExpertise}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              {EXPERTISE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="joiningDate"
                className="block text-sm font-medium text-gray-700"
              >
                Joining Date
              </label>
              <input
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={form.joiningDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                value={form.salary}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="courseId"
              className="block text-sm font-medium text-gray-700"
            >
              Course
            </label>
            <select
              id="courseId"
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="teacherImage"
              className="block text-sm font-medium text-gray-700"
            >
              Photo {mode === "edit" && "(leave empty to keep current)"}
            </label>
            <input
              id="teacherImage"
              name="teacherImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={mode === "create"}
              className="mt-1 block w-full text-sm text-gray-900"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {mode === "create" ? "Add" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
