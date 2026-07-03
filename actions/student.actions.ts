"use server";

import { connectDB } from "@/lib/db";
import studentModel from "@/model/Student";
import { CreateStudent } from "@/types/Student";
import { redirect } from "next/navigation";

export async function createStudent(formData: FormData) {
    console.log("Action ran")

    const name = formData.get("studentName") as string;
    const age = parseInt(formData.get("studentAge") as string);
    const course = formData.get("studentCourse") as string;

    await connectDB();
    const body: CreateStudent = {
        name,
        age,
        course,
    }

    const student = await studentModel.create(body);

    return redirect(`/students/${student._id}`);
}
