"use client";

import { useState, useEffect } from "react";
import { Course } from "@/types/Course";
import { createStudent } from "@/actions/student.actions";

interface CoursesAPIResponse {
    data: Course[];
    cookies: unknown;
}

export default function StudentPageClient() {
    const [error, setError] = useState<string | null>(null);
    const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
    const [courses, setCourses] = useState<Course[] | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            console.log("Fetching courses");
            try {
                const res = await fetch("/api/courses", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "super-secret-api-key",
                        Authorization: "Bearer secret-token",
                    },
                });
                const data: CoursesAPIResponse = await res.json();
                setCourses(data.data);
            } catch (e) {
                console.log(e);
                setError("Error while fetching courses.");
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchCourses();
    }, []);

    return (
        <main className="flex flex-col gap-4 p-4">
            <section className="flex flex-col gap-4 p-4 bg-gray-100 border border-gray-200">
                <h1 className="text-4xl">Add a student</h1>

                <form className="flex flex-col gap-4" action={createStudent}>
                    <label htmlFor="studentName">Name: </label>
                    <input
                        id="studentName"
                        name="studentName"
                        type="text"
                        placeholder="Student Name"
                        className="bg-white p-2 text-sm"
                    />

                    <label htmlFor="studentAge">Age: </label>
                    <input
                        id="studentAge"
                        name="studentAge"
                        type="number"
                        placeholder="Age"
                        className="bg-white p-2 text-sm"
                    />

                    <label htmlFor="studentCourse">Course: </label>
                    <select
                        id="studentCourse"
                        name="studentCourse"
                        className="bg-white p-2 text-sm"
                    >
                        {loadingCourses ? (
                            <option value={""} disabled>
                                Loading courses...
                            </option>
                        ) : (
                            courses &&
                            courses.map((course) => (
                                <option value={course.id} key={course._id}>
                                    {course.title}
                                </option>
                            ))
                        )}
                    </select>
                    <input
                        value={"Create"}
                        type="submit"
                        className="bg-green-500 text-white self-end px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
                    />
                </form>
            </section>

            {error && (
                <span className="text-red-500 self-end text-xs">{error}</span>
            )}
        </main>
    );
}
