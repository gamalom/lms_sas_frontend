import MaterialIcon from "../../material-icon";

type StudentSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
  readOnly?: boolean;
};

export default function StudentSearch({
  search,
  onSearchChange,
  onAddClick,
  readOnly = false,
}: StudentSearchProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="relative text-gray-500 focus-within:text-gray-900">
        <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-3">
          <MaterialIcon name="search" className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="block h-11 w-full max-w-sm rounded-full border border-gray-300 bg-transparent py-2.5 pr-5 pl-12 text-base font-normal text-gray-900 shadow-xs placeholder:text-gray-400 focus:outline-none"
          placeholder="Search by name, email, phone or ID"
        />
      </div>

      {!readOnly && onAddClick && (
        <button
          type="button"
          onClick={onAddClick}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Add Student
        </button>
      )}
    </div>
  );
}
