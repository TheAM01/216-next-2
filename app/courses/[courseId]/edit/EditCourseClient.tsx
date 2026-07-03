"use client";

import { Course } from "@/types/Course";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function EditCoursePageClient({ course }: { course: Course }) {
    const router = useRouter()

    const [error, setError] = useState<string | null>(null);
    const [courseTitle, setCourseTitle] = useState<string>(course.title)
    const [courseId, setCourseId] = useState<string>(course.id);

    const handleSubmit = async () => {
        const res = await fetch(`http://localhost:3000/api/courses/${course._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: courseId,
                title: courseTitle,
            })
        });

        if (!res.ok) {
            return setError("There was an error while editing. Please try again.")
        }
        const fetchedCourse: Course = await res.json()

        alert(`${fetchedCourse.title} has been successfully edited!`);
        router.push(`/courses/${fetchedCourse._id}`)
    }

    return (
        <main className="flex flex-col gap-4 p-4">
            <section className="flex flex-col gap-4 p-4 bg-gray-100 border border-gray-200">
                <h1 className="text-4xl">Edit {course.title}</h1>
                
                <form className="flex flex-col gap-4">

                    <label htmlFor="courseTitle">Title: </label>
                    <input
                        id="courseTitle"
                        type="text"
                        placeholder="Course Titlee"
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
                        onChange={(e) => setCourseId(e.target.value)}
                        value={courseId}
                    />
                    

                </form>

            </section>
            

            {error &&
                <span
                    className="text-red-500 self-end text-xs"
                >{error}</span>
            }
            <button
                onClick={handleSubmit}
                className="bg-green-500 text-white self-end px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
            >
                Save
            </button>
        </main>
    )
}