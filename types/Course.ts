export interface Course {
    _id: string;
    id: string;
    title: string
    createdAt: string;
    updatedAt: string;
}

export interface CreateCourse {
    id: string;
    title: string
}

export type UpdateCourse = Partial<CreateCourse>