import { Student } from "@/types/Student";
import Link from "next/link";

export default function StudentCard({ student }: { student: Student }) {
  return (
    <Link
      href={`/students/${student._id}`}
      className="flex flex-col gap-2 bg-gray-200 border border-gray-300 p-4 shadow-md hover:shadow-sm hover:bg-gray-100 duration-200"
    >
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-2xl">{student.name}</h1>
        <h1 className="font-bold text-gray-800 text-2xl">{student.age}</h1>
      </div>
      <p className="text-gray-500 italic">{student.course}</p>
    </Link>
  );
}
