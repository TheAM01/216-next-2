import { connectDB } from "@/lib/db";
import studentModel from "@/model/Student";
import { CreateStudent } from "@/types/Student";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
    await connectDB();

    const students = await studentModel.find().lean();

    return NextResponse.json(students);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    await connectDB();

    const body: CreateStudent = await req.json();

    const student = await studentModel.create(body);

    return NextResponse.json(student, { status: 201 })
}