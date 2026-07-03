import { Course } from "@/types/Course";
import CoursePageClient from "./CoursePageClient";

export default async function CoursePage({ params }: { params: Promise<{ courseId: string; }> }) {
    const { courseId } = await params;
    const { NEXT_PUBLIC_URI } = process.env;
    const res = await fetch(`${NEXT_PUBLIC_URI}/api/courses/${courseId}`);
    const course: Course = await res.json();
    const courseRecord = course as unknown as Record<string, unknown>;

    return <CoursePageClient course={course} courseRecord={courseRecord} />
}