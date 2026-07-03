import {
    model, models, Schema, type InferSchemaType, type Model
} from "mongoose";

const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        course: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);


export type StudentDocument = InferSchemaType<typeof studentSchema>;

const studentModel: Model<StudentDocument> =
    models["Student"] ||
    model<StudentDocument>(
        "Student",
        studentSchema,
    );


export default studentModel;