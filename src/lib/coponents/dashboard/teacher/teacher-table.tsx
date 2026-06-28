import { IInstituteTeacher } from "@/src/lib/store/institute/teacher/types.institute-teacherSlice";
import MaterialIcon from "../../material-icon";
import TableImage from "../table-image";
import { getExpertiseLabel, TABLE_COLUMNS } from "./teacher.constants";

type TeacherTableProps = {
  teachers: IInstituteTeacher[];
  loading: boolean;
  onEdit: (teacher: IInstituteTeacher) => void;
  onDelete: (teacher: IInstituteTeacher) => void;
};

export default function TeacherTable({
  teachers,
  loading,
  onEdit,
  onDelete,
}: TeacherTableProps) {
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
                Loading teachers...
              </td>
            </tr>
          )}

          {!loading && teachers.length === 0 && (
            <tr>
              <td
                colSpan={TABLE_COLUMNS.length + 1}
                className="p-5 text-sm text-gray-500"
              >
                No teachers found.
              </td>
            </tr>
          )}

          {!loading &&
            teachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="bg-white transition-all duration-500 hover:bg-gray-50"
              >
                {TABLE_COLUMNS.map((column) => (
                  <td
                    key={column.key}
                    className="whitespace-nowrap p-5 text-sm leading-6 font-medium text-gray-900"
                  >
                    {column.key === "teacherImage" ? (
                      <TableImage
                        src={teacher.teacherImage}
                        alt={teacher.teacherName}
                      />
                    ) : column.key === "teacherExpertise" ? (
                      getExpertiseLabel(String(teacher.teacherExpertise))
                    ) : column.key === "joiningDate" ? (
                      teacher.joiningDate ? (
                        new Date(teacher.joiningDate).toLocaleDateString()
                      ) : (
                        "—"
                      )
                    ) : (
                      (teacher[column.key] ?? "—")
                    )}
                  </td>
                ))}
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(teacher)}
                      className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      <MaterialIcon name="edit" className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(teacher)}
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
