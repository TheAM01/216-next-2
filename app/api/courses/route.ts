import { connectDB } from "@/lib/db";
import courseModel from "@/model/Course";
import { CreateCourse } from "@/types/Course";
import { NextRequest, NextResponse } from "next/server";
import { headers, cookies } from "next/headers";

export async function GET(req: NextRequest): Promise<NextResponse> {

    const allHeaders = await headers();
    const cookieStore = await cookies();

    const authHeader = allHeaders.get("Authorization");
    const xApiKey = allHeaders.get("x-api-key");
    
    // if (authHeader?.split(" ")[1] !== "secret-token" || xApiKey !== "super-secret-api-key") {
    //     return NextResponse.json(
    //         { success: false, },
    //         { status: 401 }
    //     )
    // }

    await connectDB();
    const theme = cookieStore.get("theme");
    const resultsPerPage = cookieStore.get("resultsPerPage");
    const courses = await courseModel.find().lean();

    if (!theme) cookieStore.set("theme", "dark");
    if (!resultsPerPage) cookieStore.set("resultsPerPage", "10");

    return NextResponse.json(
        {data: courses, cookies: {theme, resultsPerPage} }
    );
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    await connectDB();

    const body: CreateCourse = await req.json();

    const course = await courseModel.create(body);

    return NextResponse.json(course, { status: 201 })
}