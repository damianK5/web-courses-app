import { EnrollmentType } from "./enrollment"

export type ChangePasswordDTO =
{
    oldPassword: String,
    newPassword: String,
    userId: number
}