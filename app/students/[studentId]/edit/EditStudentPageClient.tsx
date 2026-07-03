"use client";

import { Student } from "@/types/Student";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditStudentPageClient({
  student,
}: {
  student: Student;
}) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string>(student.name);
  const [studentAge, setStudentAge] = useState<number>(student.age);
  const [studentCourse, setStudentCourse] = useState<string>(student.course);

  const handleSubmit = async () => {
    const res = await fetch(
      `http://localhost:3000/api/students/${student._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "super-secret-api-key",
          Authorization: "Bearer secret-token",
        },
        body: JSON.stringify({
          name: studentName,
          age: studentAge,
          course: studentCourse,
        }),
      },
    );

    if (!res.ok) {
      return setError("There was an error while editing. Please try again.");
    }
    const fetchedStudent: Student = await res.json();

    alert(`${fetchedStudent.name} has been successfully edited!`);
    router.push(`/students/${fetchedStudent._id}`);
  };

  return (
    <main className="flex flex-col gap-4 p-4">
      <section className="flex flex-col gap-4 p-4 bg-gray-100 border border-gray-200">
        <h1 className="text-4xl">Edit {student.name}</h1>

        <form className="flex flex-col gap-4">
          <label htmlFor="studentName">Name: </label>
          <input
            id="studentName"
            type="text"
            placeholder="Student Name"
            className="bg-white p-2 text-sm"
            onChange={(e) => setStudentName(e.target.value)}
            value={studentName}
          />

          <label htmlFor="studentAge">Age: </label>
          <input
            id="studentAge"
            type="age"
            placeholder="Age"
            className="bg-white p-2 text-sm"
            onChange={(e) => setStudentAge(parseInt(e.target.value))}
            value={studentAge}
          />

          <label htmlFor="studentCourse">Course: </label>
          {/* <input
                        id="studentCourse"
                        type="text"
                        placeholder="Select a course"
                        className="bg-white p-2 text-sm"
                        onChange={(e) => setStudentCourse(e.target.value)}
                        value={studentCourse}
                    /> */}
          <select
            id="studentCourse"
            className="bg-white p-2 text-sm"
            onChange={(e) => setStudentCourse(e.target.value)}
            value={studentCourse}
          >
            <option value="mern-dev">MERN Stack Development</option>
            <option value="data-sci">Data Science</option>
            <option value="ml">Machine Learning</option>
            <option value="ai">Artificial Intelligence</option>
            <option value="ui-ux">UI/UX Design</option>
          </select>
        </form>
      </section>

      {error && <span className="text-red-500 self-end text-xs">{error}</span>}
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white self-end px-2 py-1 text-sm rounded-lg shadow-sm hover:shadow-md hover:bg-green-600 duration-100 cursor-pointer"
      >
        Save
      </button>
    </main>
  );
}
