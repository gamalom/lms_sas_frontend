import { IInstituteCourse } from "@/src/lib/store/institute/course/types.institute-courseSlice";
import MaterialIcon from "../../material-icon";
import TableImage from "../table-image";
import { getCourseLevelLabel, TABLE_COLUMNS } from "./course.constants";

type CourseTableProps = {
  courses: IInstituteCourse[];
  loading: boolean;
  onEdit: (course: IInstituteCourse) => void;
  onDelete: (course: IInstituteCourse) => void;
};

export default function CourseTable({
  courses,
  loading,
  onEdit,
  onDelete,
}: CourseTableProps) {
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
                Loading courses...
              </td>
            </tr>
          )}

          {!loading && courses.length === 0 && (
            <tr>
              <td
                colSpan={TABLE_COLUMNS.length + 1}
                className="p-5 text-sm text-gray-500"
              >
                No courses found.
              </td>
            </tr>
          )}

          {!loading &&
            courses.map((course) => (
              <tr
                key={course.courseId}
                className="bg-white transition-all duration-500 hover:bg-gray-50"
              >
                {TABLE_COLUMNS.map((column) => (
                  <td
                    key={column.key}
                    className="whitespace-nowrap p-5 text-sm leading-6 font-medium text-gray-900"
                  >
                    {column.key === "courseThumbnail" ? (
                      <TableImage
                        src={course.courseThumbnail}
                        alt={course.courseName}
                      />
                    ) : column.key === "courseLevel" ? (
                      getCourseLevelLabel(course.courseLevel)
                    ) : (
                      (course[column.key] ?? "—")
                    )}
                  </td>
                ))}
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(course)}
                      className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      <MaterialIcon name="edit" className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(course)}
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
