"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  createInstituteCourse,
  editInstituteCourse,
} from "@/src/lib/store/institute/course/courseSlice";
import { IInstituteCourse } from "@/src/lib/store/institute/course/types.institute-courseSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import {
  COURSE_LEVELS,
  CourseFormData,
  INITIAL_COURSE_FORM,
} from "./course.constants";

export type CourseModalMode = "create" | "edit";

type CourseModalProps = {
  mode: CourseModalMode;
  course?: IInstituteCourse | null;
  onClose: () => void;
};

export default function CourseModal({
  mode,
  course,
  onClose,
}: CourseModalProps) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const [form, setForm] = useState<CourseFormData>(INITIAL_COURSE_FORM);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  useEffect(() => {
    if (mode === "edit" && course) {
      setForm({
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        courseDuration: course.courseDuration,
        coursePrice: course.coursePrice,
        courseLevel: course.courseLevel,
        categoryId: course.categoryId,
      });
      setThumbnail(null);
      return;
    }

    setForm(INITIAL_COURSE_FORM);
    setThumbnail(null);
  }, [mode, course]);

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
    setThumbnail(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("courseName", form.courseName);
    formData.append("courseDescription", form.courseDescription);
    formData.append("courseDuration", form.courseDuration);
    formData.append("coursePrice", form.coursePrice);
    formData.append("courseLevel", form.courseLevel);
    formData.append("categoryId", form.categoryId);

    if (thumbnail) {
      formData.append("courseThumbnail", thumbnail);
    } else if (mode === "edit" && course?.courseThumbnail) {
      formData.append("courseThumbnail", course.courseThumbnail);
    }

    if (mode === "create") {
      dispatch(createInstituteCourse(formData));
    } else if (mode === "edit" && course) {
      dispatch(editInstituteCourse(course.courseId, formData));
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">
          {mode === "create" ? "Add Course" : "Edit Course"}
        </h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="courseName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="courseName"
              name="courseName"
              type="text"
              value={form.courseName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="courseDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={form.courseDescription}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="courseDuration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <input
                id="courseDuration"
                name="courseDuration"
                type="text"
                value={form.courseDuration}
                onChange={handleChange}
                required
                placeholder="e.g. 8 weeks"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="coursePrice"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id="coursePrice"
                name="coursePrice"
                type="text"
                value={form.coursePrice}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="courseLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Level
            </label>
            <select
              id="courseLevel"
              name="courseLevel"
              value={form.courseLevel}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              {COURSE_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.catagoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="courseThumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail {mode === "edit" && "(leave empty to keep current)"}
            </label>
            <input
              id="courseThumbnail"
              name="courseThumbnail"
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
