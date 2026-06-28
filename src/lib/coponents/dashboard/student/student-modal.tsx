"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  createInstituteStudent,
  editInstituteStudent,
} from "@/src/lib/store/institute/student/institute-studentSlice";
import { IInstituteStudent } from "@/src/lib/store/institute/student/types.institute-studentSlice";
import { useAppDispatch } from "@/src/lib/store/hooks";
import {
  INITIAL_STUDENT_FORM,
  StudentFormData,
} from "./student.constants";

export type StudentModalMode = "create" | "edit";

type StudentModalProps = {
  mode: StudentModalMode;
  student?: IInstituteStudent | null;
  onClose: () => void;
};

export default function StudentModal({
  mode,
  student,
  onClose,
}: StudentModalProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<StudentFormData>(INITIAL_STUDENT_FORM);
  const [studentImage, setStudentImage] = useState<File | null>(null);

  useEffect(() => {
    if (mode === "edit" && student) {
      setForm({
        studentName: student.studentName,
        studentEmail: student.studentEmail,
        studentPhoneNumber: student.studentPhoneNumber,
        studentAddress: student.studentAddress,
        enrollmentDate: student.enrollmentDate
          ? new Date(student.enrollmentDate).toISOString().split("T")[0]
          : "",
      });
      setStudentImage(null);
      return;
    }

    setForm(INITIAL_STUDENT_FORM);
    setStudentImage(null);
  }, [mode, student]);

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
    setStudentImage(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("studentName", form.studentName);
    formData.append("studentEmail", form.studentEmail);
    formData.append("studentPhoneNumber", form.studentPhoneNumber);
    formData.append("studentAddress", form.studentAddress);
    formData.append("enrollmentDate", form.enrollmentDate);

    if (studentImage) {
      formData.append("studentImage", studentImage);
    } else if (mode === "edit" && student?.studentImage) {
      formData.append("studentImage", student.studentImage);
    }

    if (mode === "create") {
      dispatch(createInstituteStudent(formData));
    } else if (mode === "edit" && student) {
      dispatch(editInstituteStudent(student.id, formData));
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">
          {mode === "create" ? "Add Student" : "Edit Student"}
        </h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="studentName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="studentName"
              name="studentName"
              type="text"
              value={form.studentName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="studentEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="studentEmail"
                name="studentEmail"
                type="email"
                value={form.studentEmail}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="studentPhoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="studentPhoneNumber"
                name="studentPhoneNumber"
                type="tel"
                value={form.studentPhoneNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="studentAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="studentAddress"
              name="studentAddress"
              value={form.studentAddress}
              onChange={handleChange}
              required
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="enrollmentDate"
              className="block text-sm font-medium text-gray-700"
            >
              Enrollment Date
            </label>
            <input
              id="enrollmentDate"
              name="enrollmentDate"
              type="date"
              value={form.enrollmentDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="studentImage"
              className="block text-sm font-medium text-gray-700"
            >
              Photo {mode === "edit" && "(leave empty to keep current)"}
            </label>
            <input
              id="studentImage"
              name="studentImage"
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
