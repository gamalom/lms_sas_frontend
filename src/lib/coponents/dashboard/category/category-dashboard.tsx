"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "@/src/lib/store/institute/category/categorySlice";
import { ICategory } from "@/src/lib/store/institute/category/types.category";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { Status } from "@/src/lib/types/types";
import { useDebounce } from "../../debounce";
import CategoryDeleteToast from "./category-delete-toast";
import CategoryModal from "./category-modal";
import CategoryPagination from "./category-pagination";
import CategorySearch from "./category-search";
import CategoryTable from "./category-table";
import {
  CATEGORIES_PER_PAGE,
  filterCategories,
  getTotalPages,
  paginateCategories,
} from "./category.constants";

type CategoryModalState =
  | { mode: "create" }
  | { mode: "edit"; category: ICategory }
  | null;

export default function CategoryDashboard() {
  const dispatch = useAppDispatch();
  const { categories, status } = useAppSelector((state) => state.category);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null,
  );
  const [modalState, setModalState] = useState<CategoryModalState>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const filteredCategories = useMemo(
    () => filterCategories(categories, debouncedSearch),
    [categories, debouncedSearch],
  );

  const totalPages = getTotalPages(filteredCategories.length);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedCategories = useMemo(
    () => paginateCategories(filteredCategories, currentPage),
    [filteredCategories, currentPage],
  );

  function openCreateModal() {
    setModalState({ mode: "create" });
  }

  function openEditModal(category: ICategory) {
    setModalState({ mode: "edit", category });
  }

  function closeModal() {
    setModalState(null);
  }

  function handleDeleteConfirm() {
    if (!categoryToDelete) return;

    dispatch(deleteCategory(categoryToDelete.id));
    setCategoryToDelete(null);
  }

  const loading = status === Status.LOADING;
  const error = status === Status.ERROR;

  return (
    <div className="flex flex-col gap-4">
      <CategorySearch
        search={search}
        onSearchChange={setSearch}
        onAddClick={openCreateModal}
      />

      {error && (
        <p className="text-sm text-red-600">
          Failed to load categories. Please log in and try again.
        </p>
      )}

      <CategoryTable
        categories={paginatedCategories}
        loading={loading}
        onEdit={openEditModal}
        onDelete={setCategoryToDelete}
      />

      <CategoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCategories.length}
        itemsPerPage={CATEGORIES_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {modalState && (
        <CategoryModal
          mode={modalState.mode}
          category={modalState.mode === "edit" ? modalState.category : null}
          onClose={closeModal}
        />
      )}

      {categoryToDelete && (
        <CategoryDeleteToast
          category={categoryToDelete}
          onCancel={() => setCategoryToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
