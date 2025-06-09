import { Course } from "./course"
import { Homework } from "./homework"
import { User } from "./user"

export type Admission = 
{
    id: number,
    user: User,
    course: Course,
    homework: Homework,
    filepath:string,
    admissionDate: number,
    studentComment: string,
    teacherComment: string,
    grade: number
}