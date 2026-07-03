import {
    model, models, Schema, type InferSchemaType, type Model
} from "mongoose";

const courseSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);


export type CourseDocument = InferSchemaType<typeof courseSchema>;

const courseModel: Model<CourseDocument> =
    models["Course"] ||
    model<CourseDocument>(
        "Course",
        courseSchema,
    );


export default courseModel;