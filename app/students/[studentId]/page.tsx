import { Student } from "@/types/Student";
import StudentPageClient from "./StudentPageClient";

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
  const studentRecord = student as unknown as Record<string, unknown>;

  return <StudentPageClient student={student} studentRecord={studentRecord} />;
}
