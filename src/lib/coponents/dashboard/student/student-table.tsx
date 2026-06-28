import { IInstituteStudent } from "@/src/lib/store/institute/student/types.institute-studentSlice";
import MaterialIcon from "../../material-icon";
import TableImage from "../table-image";
import { TABLE_COLUMNS } from "./student.constants";

type StudentTableProps = {
  students: IInstituteStudent[];
  loading: boolean;
  readOnly?: boolean;
  onEdit?: (student: IInstituteStudent) => void;
  onDelete?: (student: IInstituteStudent) => void;
};

export default function StudentTable({
  students,
  loading,
  readOnly = false,
  onEdit,
  onDelete,
}: StudentTableProps) {
  const showActions = !readOnly && onEdit && onDelete;

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
            {showActions && (
              <th
                scope="col"
                className="rounded-tr-xl p-5 text-left text-sm leading-6 font-semibold capitalize text-gray-900"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {loading && (
            <tr>
              <td
                colSpan={TABLE_COLUMNS.length + (showActions ? 1 : 0)}
                className="p-5 text-sm text-gray-500"
              >
                Loading students...
              </td>
            </tr>
          )}

          {!loading && students.length === 0 && (
            <tr>
              <td
                colSpan={TABLE_COLUMNS.length + (showActions ? 1 : 0)}
                className="p-5 text-sm text-gray-500"
              >
                No students found.
              </td>
            </tr>
          )}

          {!loading &&
            students.map((student) => (
              <tr
                key={student.id}
                className="bg-white transition-all duration-500 hover:bg-gray-50"
              >
                {TABLE_COLUMNS.map((column) => (
                  <td
                    key={column.key}
                    className="whitespace-nowrap p-5 text-sm leading-6 font-medium text-gray-900"
                  >
                    {column.key === "studentImage" ? (
                      <TableImage
                        src={student.studentImage}
                        alt={student.studentName}
                      />
                    ) : column.key === "enrollmentDate" ? (
                      student.enrollmentDate ? (
                        new Date(student.enrollmentDate).toLocaleDateString()
                      ) : (
                        "—"
                      )
                    ) : (
                      (student[column.key] ?? "—")
                    )}
                  </td>
                ))}
                {showActions && (
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit?.(student)}
                        className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                      >
                        <MaterialIcon name="edit" className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete?.(student)}
                        className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <MaterialIcon name="delete" className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
