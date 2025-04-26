import { Course } from "./course"

export type Asset = 
{
    id:number,
    course: Course,
    name: string,
    comment:string,
    filepath:string
}