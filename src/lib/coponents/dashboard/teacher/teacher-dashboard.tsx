"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchInstituteCourse } from "@/src/lib/store/institute/course/courseSlice";
import {
  deleteInstituteTeacherById,
  fetchInstituteTeacher,
} from "@/src/lib/store/institute/teacher/institute-teacherSlice";
import { IInstituteTeacher } from "@/src/lib/store/institute/teacher/types.institute-teacherSlice";
import { canManageInstituteResources } from "@/src/lib/store/auth/types.authSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { Status } from "@/src/lib/types/types";
import { useDebounce } from "../../debounce";
import TeacherDeleteToast from "./teacher-delete-toast";
import TeacherModal from "./teacher-modal";
import TeacherPagination from "./teacher-pagination";
import TeacherSearch from "./teacher-search";
import TeacherTable from "./teacher-table";
import {
  filterTeachers,
  getTotalPages,
  paginateTeachers,
  TEACHERS_PER_PAGE,
} from "./teacher.constants";

type TeacherModalState =
  | { mode: "create" }
  | { mode: "edit"; teacher: IInstituteTeacher }
  | null;

type TeacherDashboardProps = {
  readOnly?: boolean;
};

export default function TeacherDashboard({
  readOnly = false,
}: TeacherDashboardProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { teachers } = useAppSelector((state) => state.teacher);
  const { courses } = useAppSelector((state) => state.course);
  const canManage = !readOnly && canManageInstituteResources(user);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [teacherToDelete, setTeacherToDelete] =
    useState<IInstituteTeacher | null>(null);
  const [modalState, setModalState] = useState<TeacherModalState>(null);

  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(fetchInstituteTeacher());
    }
    if (courses.length === 0) {
      dispatch(fetchInstituteCourse());
    }
  }, [dispatch, teachers.length, courses.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const filteredTeachers = useMemo(
    () => filterTeachers(teachers, debouncedSearch),
    [teachers, debouncedSearch],
  );

  const totalPages = getTotalPages(filteredTeachers.length);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedTeachers = useMemo(
    () => paginateTeachers(filteredTeachers, currentPage),
    [filteredTeachers, currentPage],
  );

  function openCreateModal() {
    setModalState({ mode: "create" });
  }

  function openEditModal(teacher: IInstituteTeacher) {
    setModalState({ mode: "edit", teacher });
  }

  function closeModal() {
    setModalState(null);
  }

  function handleDeleteConfirm() {
    if (!teacherToDelete) return;

    dispatch(deleteInstituteTeacherById(teacherToDelete.id));
    setTeacherToDelete(null);
  }

  const loading =
    useAppSelector((state) => state.teacher.status) === Status.LOADING;
  const error =
    useAppSelector((state) => state.teacher.status) === Status.ERROR;

  return (
    <div className="flex flex-col gap-4">
      <TeacherSearch
        search={search}
        onSearchChange={setSearch}
        onAddClick={canManage ? openCreateModal : undefined}
        readOnly={!canManage}
      />

      {error && (
        <p className="text-sm text-red-600">
          Failed to load teachers. Please log in and try again.
        </p>
      )}

      <TeacherTable
        teachers={paginatedTeachers}
        loading={loading}
        readOnly={!canManage}
        onEdit={canManage ? openEditModal : undefined}
        onDelete={canManage ? setTeacherToDelete : undefined}
      />

      <TeacherPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredTeachers.length}
        itemsPerPage={TEACHERS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {modalState && canManage && (
        <TeacherModal
          mode={modalState.mode}
          teacher={modalState.mode === "edit" ? modalState.teacher : null}
          onClose={closeModal}
        />
      )}

      {teacherToDelete && canManage && (
        <TeacherDeleteToast
          teacher={teacherToDelete}
          onCancel={() => setTeacherToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
