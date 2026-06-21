"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  createCategory,
  editCategory,
} from "@/src/lib/store/institute/category/categorySlice";
import { ICategory } from "@/src/lib/store/institute/category/types.category";
import { useAppDispatch } from "@/src/lib/store/hooks";
import { CategoryFormData, INITIAL_CATEGORY_FORM } from "./category.constants";

export type CategoryModalMode = "create" | "edit";

type CategoryModalProps = {
  mode: CategoryModalMode;
  category?: ICategory | null;
  onClose: () => void;
};

export default function CategoryModal({
  mode,
  category,
  onClose,
}: CategoryModalProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<CategoryFormData>(INITIAL_CATEGORY_FORM);

  useEffect(() => {
    if (mode === "edit" && category) {
      setForm({
        catagoryName: category.catagoryName,
        catagoryDescription: category.catagoryDescription,
      });
      return;
    }

    setForm(INITIAL_CATEGORY_FORM);
  }, [mode, category]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode === "create") {
      dispatch(createCategory(form));
    } else if (mode === "edit" && category) {
      dispatch(editCategory(category.id, form));
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">
          {mode === "create" ? "Add Category" : "Edit Category"}
        </h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="catagoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="catagoryName"
              name="catagoryName"
              type="text"
              value={form.catagoryName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="catagoryDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="catagoryDescription"
              name="catagoryDescription"
              value={form.catagoryDescription}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
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
