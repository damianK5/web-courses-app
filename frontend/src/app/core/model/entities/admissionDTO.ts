
export type AdmissionDTO = 
{
    id?: number | null,
    admissionDate: number,
    filepath?: string | null,
    grade?: number | null,
    studentComment?: string | null,
    teacherComment?: string | null,
    courseId: number,
    homeworkId: number,
    userId: number,
}