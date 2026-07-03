import StudentCard from "@/components/StudentCard";
import { Student } from "@/types/Student";
import Link from "next/link";

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ unauth: string }>;
}) {
  const { unauth } = await searchParams;
  const { NEXT_PUBLIC_URI } = process.env;
  const res = await fetch(`${NEXT_PUBLIC_URI}/api/students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "super-secret-api-key",
      Authorization: "Bearer secret-token",
    },
  });
  const students: Student[] = await res.json();

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex flex-row flex-1 justify-between w-full items-center">
        <h1 className="text-4xl">Students</h1>
        <Link
          href={"/students/new"}
          className="bg-green-500 text-white self-end px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
        >
          Add Student
        </Link>
      </div>
      {unauth === "true" && (
        <div className="bg-red-300/50 border border-red-500 text-red-500 p-4">
          You must be logged in to create/edit students
        </div>
      )}
      {students.map((student) => (
        <StudentCard student={student} key={student._id} />
      ))}
    </main>
  );
}
