import { Course } from "./course"

export type Homework =
{
  id: number,
  course_id: number,
  name: string,
  description: string,
  deadline: number,
  maxGrade: number,
  requireAdmission: boolean,
  filepath?: string
}