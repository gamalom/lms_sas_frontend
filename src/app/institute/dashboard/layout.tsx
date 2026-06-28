import AuthGuard from "@/src/lib/coponents/auth/auth-guard";
import DashboardComponent from "@/src/lib/coponents/dashboard/dashboard-component";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <AuthGuard>
      <DashboardComponent>{children}</DashboardComponent>
    </AuthGuard>
  );
}
