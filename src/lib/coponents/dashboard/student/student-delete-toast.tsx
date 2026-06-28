import { IInstituteStudent } from "@/src/lib/store/institute/student/types.institute-studentSlice";

type StudentDeleteToastProps = {
  student: IInstituteStudent;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function StudentDeleteToast({
  student,
  onCancel,
  onConfirm,
}: StudentDeleteToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <p className="text-sm text-gray-900">
        Are you sure you want to remove{" "}
        <span className="font-semibold">{student.studentName}</span>?
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
