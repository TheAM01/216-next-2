import { connectDB } from "@/lib/db";
import courseModel from "@/model/Course";
import { UpdateCourse } from "@/types/Course";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ courseId: string; }> }): Promise<NextResponse> {

    


    await connectDB();
    const { courseId } = await params;

    const course = await courseModel.findById(courseId).lean();

    if (!course) {
        return NextResponse.json(
            { error: "Course not found!" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        course, 
    );
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ courseId: string; }> }): Promise<NextResponse> {
    await connectDB();
    const { courseId } = await params;
    const body: UpdateCourse = await req.json();

    const course = await courseModel.findByIdAndUpdate(
        courseId, 
        body,
        {
            new: true
        }
    ).lean();

    if (!course) {
        return NextResponse.json(
            { error: "Course not found!" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        course
    );
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ courseId: string; }> }): Promise<NextResponse> {
    await connectDB();
    const { courseId } = await params;
    

    const course = await courseModel.findByIdAndDelete(courseId);

    if (!course) {
        return NextResponse.json(
            { error: "Course not found!" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { message: "Course deleted!" }
    );
}