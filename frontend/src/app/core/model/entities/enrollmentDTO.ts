import { EnrollmentType } from "./enrollment"

export type EnrollmentDTO =
{
    user_id: number,
    course_id: number,
    confirmed: boolean,
    type: EnrollmentType
}