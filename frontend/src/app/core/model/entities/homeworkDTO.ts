import { Course } from "./course"

export type HomeworkDTO =
{
  id?: number,
  course_id: number,
  name: string,
  description: string,
  deadline: number,
  maxGrade: number,
  filepath?: string
}