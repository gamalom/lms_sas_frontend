import { ICategory } from "@/src/lib/store/institute/category/types.category";
import MaterialIcon from "../../material-icon";
import {
  formatCreatedAt,
  TABLE_COLUMNS,
} from "./category.constants";

type CategoryTableProps = {
  categories: ICategory[];
  loading: boolean;
  onEdit: (category: ICategory) => void;
  onDelete: (category: ICategory) => void;
};

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-xl">
        <thead>
          <tr className="bg-gray-50">
            {TABLE_COLUMNS.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="p-5 text-left text-sm leading-6 font-semibold capitalize text-gray-900 first:rounded-tl-xl last:rounded-tr-xl"
              >
                {column.label}
              </th>
            ))}
            <th
              scope="col"
              className="rounded-tr-xl p-5 text-left text-sm leading-6 font-semibold capitalize text-gray-900"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {loading && (
            <tr>
              <td
                colSpan={TABLE_COLUMNS.length + 1}
                className="p-5 text-sm text-gray-500"
              >
                Loading categories...
              </td>
            </tr>
          )}

          {!loading && categories.length === 0 && (
            <tr>
              <td
                colSpan={TABLE_COLUMNS.length + 1}
                className="p-5 text-sm text-gray-500"
              >
                No categories found.
              </td>
            </tr>
          )}

          {!loading &&
            categories.map((category) => (
              <tr
                key={category.id}
                className="bg-white transition-all duration-500 hover:bg-gray-50"
              >
                {TABLE_COLUMNS.map((column) => (
                  <td
                    key={column.key}
                    className="whitespace-nowrap p-5 text-sm leading-6 font-medium text-gray-900"
                  >
                    {column.key === "createdAt"
                      ? formatCreatedAt(category.createdAt)
                      : category[column.key]}
                  </td>
                ))}
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(category)}
                      className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      <MaterialIcon name="edit" className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(category)}
                      className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <MaterialIcon name="delete" className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
