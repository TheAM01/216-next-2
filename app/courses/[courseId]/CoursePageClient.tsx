"use client";

import { Course } from "@/types/Course";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function CoursePageClient({ course, courseRecord }: { course: Course, courseRecord: Record<string, unknown> }) {
    const router = useRouter()

    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3000/api/courses/${course._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (!res.ok) {
            return setError("There was an error while deleting. Please try again.")
        }

        alert(`${course.title} has been deleted successfully!`)

        router.push("/courses")
    }

    return (
        <main className="flex flex-col gap-4 p-4">
            <section className="flex flex-col gap-4 p-4 bg-gray-100 border border-gray-200">
                <h1 className="text-4xl">{course.title}</h1>
                {Array.from(Object.keys(courseRecord)).map(key => (
                    <article
                        key={key}
                        className="flex items-center justify-between"
                    >
                        <h2 className="text-xl font-semibold">{key}</h2>
                        <p className="">{String(courseRecord[key])}</p>
                    </article>
                ))}
            </section>
            

            {error &&
                <span
                    className="text-red-500 self-end text-xs"
                >{error}</span>
            }
            <div className="flex w-full gap-4 justify-end">
                <Link
                    href={`/courses/${course._id}/edit`}
                    className="bg-green-500 text-white  px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
                >
                    Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white  px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-red-600 duration-100 cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </main>
    )
}