"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isInstituteUser } from "@/src/lib/store/auth/types.authSlice";
import { useAppSelector } from "@/src/lib/store/hooks";
import StudentCourseTeachers from "@/src/lib/coponents/dashboard/student/student-course-teachers";

export default function StudentDashboardPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (isInstituteUser(user)) {
      router.replace("/institute/dashboard");
    }
  }, [user, router]);

  if (isInstituteUser(user)) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Browse your institute courses and view assigned teachers. You can choose
          a teacher when a course has more than one instructor.
        </p>
      </div>

      <StudentCourseTeachers />
    </div>
  );
}
