"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteInstituteCourse,
  fetchInstituteCourse,
} from "@/src/lib/store/institute/course/courseSlice";
import { fetchCategories } from "@/src/lib/store/institute/category/categorySlice";
import { IInstituteCourse } from "@/src/lib/store/institute/course/types.institute-courseSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { Status } from "@/src/lib/types/types";
import { useDebounce } from "../../debounce";
import CourseDeleteToast from "./course-delete-toast";
import CourseModal from "./course-modal";
import CoursePagination from "./course-pagination";
import CourseSearch from "./course-search";
import CourseTable from "./course-table";
import {
  COURSES_PER_PAGE,
  filterCourses,
  getTotalPages,
  paginateCourses,
} from "./course.constants";

type CourseModalState =
  | { mode: "create" }
  | { mode: "edit"; course: IInstituteCourse }
  | null;

export default function CourseDashboard() {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.course);
  const { categories } = useAppSelector((state) => state.category);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [courseToDelete, setCourseToDelete] = useState<IInstituteCourse | null>(
    null,
  );
  const [modalState, setModalState] = useState<CourseModalState>(null);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchInstituteCourse());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, courses.length, categories.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const filteredCourses = useMemo(
    () => filterCourses(courses, debouncedSearch),
    [courses, debouncedSearch],
  );

  const totalPages = getTotalPages(filteredCourses.length);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedCourses = useMemo(
    () => paginateCourses(filteredCourses, currentPage),
    [filteredCourses, currentPage],
  );

  function openCreateModal() {
    setModalState({ mode: "create" });
  }

  function openEditModal(course: IInstituteCourse) {
    setModalState({ mode: "edit", course });
  }

  function closeModal() {
    setModalState(null);
  }

  function handleDeleteConfirm() {
    if (!courseToDelete) return;

    dispatch(deleteInstituteCourse(courseToDelete.courseId));
    setCourseToDelete(null);
  }

  const loading =
    useAppSelector((state) => state.course.status) === Status.LOADING;
  const error = useAppSelector((state) => state.course.status) === Status.ERROR;

  return (
    <div className="flex flex-col gap-4">
      <CourseSearch
        search={search}
        onSearchChange={setSearch}
        onAddClick={openCreateModal}
      />

      {error && (
        <p className="text-sm text-red-600">
          Failed to load courses. Please log in and try again.
        </p>
      )}

      <CourseTable
        courses={paginatedCourses}
        loading={loading}
        onEdit={openEditModal}
        onDelete={setCourseToDelete}
      />

      <CoursePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCourses.length}
        itemsPerPage={COURSES_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {modalState && (
        <CourseModal
          mode={modalState.mode}
          course={modalState.mode === "edit" ? modalState.course : null}
          onClose={closeModal}
        />
      )}

      {courseToDelete && (
        <CourseDeleteToast
          course={courseToDelete}
          onCancel={() => setCourseToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
