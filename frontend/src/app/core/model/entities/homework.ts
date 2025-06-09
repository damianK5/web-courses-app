import { Course } from "./course"

export type Homework =
{
    id: number,
    course: Course,
    name: string,
    description: string,
    deadline: number,
    maxGrade: number,
    requireAdmission: boolean,
    filepath?: string
}