import { ICategory } from "@/src/lib/store/institute/category/types.category";

export const TABLE_COLUMNS = [
  { key: "catagoryName" as const, label: "Name" },
  { key: "catagoryDescription" as const, label: "Description" },
  { key: "id" as const, label: "ID" },
  { key: "createdAt" as const, label: "Created At" },
];

export const INITIAL_CATEGORY_FORM = {
  catagoryName: "",
  catagoryDescription: "",
};

export type CategoryFormData = typeof INITIAL_CATEGORY_FORM;

export type CategoryTableColumn = (typeof TABLE_COLUMNS)[number];

export function formatCreatedAt(value?: string) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function filterCategories(categories: ICategory[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return categories;

  return categories.filter(
    (category) =>
      category.catagoryName.toLowerCase().includes(normalizedQuery) ||
      category.id.toLowerCase().includes(normalizedQuery),
  );
}
