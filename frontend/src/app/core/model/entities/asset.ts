import { Course } from "./course"

export type Asset = 
{
    id:number,
    course: Course,
    name: string,
    relevantDate: number,
    comment:string,
    filepath:string
}