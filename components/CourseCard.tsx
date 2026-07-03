import { Course } from "@/types/Course";
import Link from "next/link";

export default function CourseCard({ course }: { course: Course }) {



    return (
        <Link
            href={`/courses/${course._id}`}
            className="flex flex-col gap-2 bg-gray-200 border border-gray-300 p-4 shadow-md hover:shadow-sm hover:bg-gray-100 duration-200"
        >
            <h1 className="font-bold text-2xl">{course.title}</h1>
            <p className="text-gray-500 italic">{course.id}</p>
        </Link>
    )
}