import DashboardComponent from "@/src/lib/coponents/dashboard/dashboard-component";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return <DashboardComponent>{children}</DashboardComponent>;
}
