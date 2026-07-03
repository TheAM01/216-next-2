import { Course } from "@/types/Course";
import EditCourseClient from "./EditCourseClient";

export default async function CoursePage({ params }: { params: Promise<{ courseId: string; }> }) {
    const { courseId } = await params;
    const { NEXT_PUBLIC_URI } = process.env;
    const res = await fetch(`${NEXT_PUBLIC_URI}/api/courses/${courseId}`);
    const course: Course = await res.json();

    return <EditCourseClient course={course}/>
}