import { Student } from "@/types/Student";
import EditStudentPageClient from "./EditStudentPageClient";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  const { NEXT_PUBLIC_URI } = process.env;
  const res = await fetch(`${NEXT_PUBLIC_URI}/api/students/${studentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "super-secret-api-key",
      Authorization: "Bearer secret-token",
    },
  });
  const student: Student = await res.json();

  return <EditStudentPageClient student={student} />;
}
