import {
  MdAccountCircle,
  MdBarChart,
  MdCalendarToday,
  MdChevronLeft,
  MdChevronRight,
  MdDashboard,
  MdDelete,
  MdEdit,
  MdFolder,
  MdGroups,
  MdInventory2,
  MdMenu,
  MdSearch,
  MdTrackChanges,
} from "react-icons/md";

const materialIcons = {
  accountCircle: MdAccountCircle,
  barChart: MdBarChart,
  calendarToday: MdCalendarToday,
  chevronLeft: MdChevronLeft,
  chevronRight: MdChevronRight,
  dashboard: MdDashboard,
  delete: MdDelete,
  edit: MdEdit,
  folder: MdFolder,
  groups: MdGroups,
  inventory: MdInventory2,
  menu: MdMenu,
  search: MdSearch,
  trackChanges: MdTrackChanges,
} as const;

export type MaterialIconName = keyof typeof materialIcons;

type MaterialIconProps = {
  name: MaterialIconName;
  className?: string;
};

export default function MaterialIcon({ name, className }: MaterialIconProps) {
  const Icon = materialIcons[name];
  return <Icon className={className} aria-hidden="true" />;
}
