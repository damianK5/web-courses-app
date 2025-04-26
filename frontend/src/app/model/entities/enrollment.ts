import { Course } from "./course"
import { User } from "./user"

export enum EnrollmentType
{
    MAIN_TEACHER = "MAIN_TEACHER", TEACHER = "TEACHER", STUDENT = "STUDENT"
}

export type Enrollment =
{
    id: number,
    user: User
    course: Course,
    confirmed: boolean,
    type: EnrollmentType
    groupNumber: number
}