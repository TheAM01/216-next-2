"use client";

import { Course } from "@/types/Course";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CoursePageClient() {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [courseTitle, setCourseTitle] = useState<string>("");
    const [courseId, setCourseId] = useState<string>("");

    const handleSubmit = async () => {
        const res = await fetch(`http://localhost:3000/api/courses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: courseId,
                title: courseTitle,
            }),
        });

        if (!res.ok) {
            return setError(
                "There was an error while deleting. Please try again.",
            );
        }
        const course: Course = await res.json();

        alert(`${course.title} has been successfully created!`);
        router.push(`/courses/${course._id}`);
    };

    return (
        <main className="flex flex-col gap-4 p-4">
            <section className="flex flex-col gap-4 p-4 bg-gray-100 border border-gray-200">
                <h1 className="text-4xl">Add a course</h1>

                <form className="flex flex-col gap-4">
                    <label htmlFor="courseTitle">Title: </label>
                    <input
                        id="courseTitle"
                        type="text"
                        placeholder="Course Title"
                        className="bg-white p-2 text-sm"
                        onChange={(e) => setCourseTitle(e.target.value)}
                        value={courseTitle}
                    />

                    <label htmlFor="courseId">Course ID: </label>
                    <input
                        id="courseId"
                        type="text"
                        placeholder="Course unique ID"
                        className="bg-white p-2 text-sm"
                        onChange={(e) =>
                            setCourseId(e.target.value.replaceAll(" ", "-"))
                        }
                        value={courseId}
                    />
                </form>
            </section>

            {error && (
                <span className="text-red-500 self-end text-xs">{error}</span>
            )}
            <button
                onClick={handleSubmit}
                className="bg-green-500 text-white self-end px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
            >
                Create
            </button>
        </main>
    );
}
