import AuthGuard from "@/src/lib/coponents/auth/auth-guard";
import DashboardHeader from "@/src/lib/coponents/dashboard/dashboard-header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function StudentDashboardLayout({ children }: LayoutProps) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <DashboardHeader showRegisterAsInstitute />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
