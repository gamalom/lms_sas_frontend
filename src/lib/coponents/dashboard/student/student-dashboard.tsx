"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteInstituteStudentById,
  fetchInstituteStudents,
} from "@/src/lib/store/institute/student/institute-studentSlice";
import { IInstituteStudent } from "@/src/lib/store/institute/student/types.institute-studentSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { Status } from "@/src/lib/types/types";
import { useDebounce } from "../../debounce";
import StudentDeleteToast from "./student-delete-toast";
import StudentModal from "./student-modal";
import StudentPagination from "./student-pagination";
import StudentSearch from "./student-search";
import StudentTable from "./student-table";
import {
  filterStudents,
  getTotalPages,
  paginateStudents,
  STUDENTS_PER_PAGE,
} from "./student.constants";

type StudentModalState =
  | { mode: "create" }
  | { mode: "edit"; student: IInstituteStudent }
  | null;

export default function StudentDashboard() {
  const dispatch = useAppDispatch();
  const { students } = useAppSelector((state) => state.student);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentToDelete, setStudentToDelete] =
    useState<IInstituteStudent | null>(null);
  const [modalState, setModalState] = useState<StudentModalState>(null);

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchInstituteStudents());
    }
  }, [dispatch, students.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const filteredStudents = useMemo(
    () => filterStudents(students, debouncedSearch),
    [students, debouncedSearch],
  );

  const totalPages = getTotalPages(filteredStudents.length);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedStudents = useMemo(
    () => paginateStudents(filteredStudents, currentPage),
    [filteredStudents, currentPage],
  );

  function openCreateModal() {
    setModalState({ mode: "create" });
  }

  function openEditModal(student: IInstituteStudent) {
    setModalState({ mode: "edit", student });
  }

  function closeModal() {
    setModalState(null);
  }

  function handleDeleteConfirm() {
    if (!studentToDelete) return;

    dispatch(deleteInstituteStudentById(studentToDelete.id));
    setStudentToDelete(null);
  }

  const loading =
    useAppSelector((state) => state.student.status) === Status.LOADING;
  const error =
    useAppSelector((state) => state.student.status) === Status.ERROR;

  return (
    <div className="flex flex-col gap-4">
      <StudentSearch
        search={search}
        onSearchChange={setSearch}
        onAddClick={openCreateModal}
      />

      {error && (
        <p className="text-sm text-red-600">
          Failed to load students. Please log in and try again.
        </p>
      )}

      <StudentTable
        students={paginatedStudents}
        loading={loading}
        onEdit={openEditModal}
        onDelete={setStudentToDelete}
      />

      <StudentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredStudents.length}
        itemsPerPage={STUDENTS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {modalState && (
        <StudentModal
          mode={modalState.mode}
          student={modalState.mode === "edit" ? modalState.student : null}
          onClose={closeModal}
        />
      )}

      {studentToDelete && (
        <StudentDeleteToast
          student={studentToDelete}
          onCancel={() => setStudentToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
