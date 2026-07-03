import { connectDB } from "@/lib/db";
import studentModel from "@/model/Student";
import { UpdateStudent } from "@/types/Student";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ studentId: string; }> }): Promise<NextResponse> {
    await connectDB();
    const { studentId } = await params;

    const student = await studentModel.findById(studentId).lean();

    if (!student) {
        return NextResponse.json(
            { error: "Student not found!" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        student
    );
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ studentId: string; }> }): Promise<NextResponse> {
    await connectDB();
    const { studentId } = await params;
    const body: UpdateStudent = await req.json();

    const student = await studentModel.findByIdAndUpdate(
        studentId, 
        body,
        {
            new: true
        }
    ).lean();

    if (!student) {
        return NextResponse.json(
            { error: "Student not found!" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        student
    );
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ studentId: string; }> }): Promise<NextResponse> {
    await connectDB();
    const { studentId } = await params;
    

    const student = await studentModel.findByIdAndDelete(studentId);

    if (!student) {
        return NextResponse.json(
            { error: "Student not found!" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { message: "Student deleted!" }
    );
}