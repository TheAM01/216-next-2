import CourseCard from "@/components/CourseCard";
import { Course } from "@/types/Course";
import Link from "next/link";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ unauth: string }>;
}) {
  const { unauth } = await searchParams;
  const { NEXT_PUBLIC_URI } = process.env;
  const res = await fetch(`${NEXT_PUBLIC_URI}/api/courses`);
  const courses: { data: Course[] } = await res.json();
  console.log(unauth);
  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex flex-row flex-1 justify-between w-full items-center">
        <h1 className="text-4xl">Courses</h1>
        <Link
          href={"/courses/new"}
          className="bg-green-500 text-white self-end px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
        >
          Add Course
        </Link>
      </div>
      {unauth === "true" && (
        <div className="bg-red-300/50 border border-red-500 text-red-500 p-4">
          You must be logged in to create/edit courses
        </div>
      )}
      {courses.data.map((course) => (
        <CourseCard course={course} key={course._id} />
      ))}
    </main>
  );
}
