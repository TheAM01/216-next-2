export interface Student {
    _id: string;
    name: string;
    age: number;
    course: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateStudent {
    name: string;
    age: number;
    course: string;
}

export type UpdateStudent = Partial<CreateStudent>