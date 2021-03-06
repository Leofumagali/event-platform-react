import { gql, useQuery } from "@apollo/client";
import { Key } from "react";
import { Lessons } from "./Lessons";


const GET_LESSONS_QUERY = gql`
    query {
        lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
            id
            lessonType
            availableAt
            title
            slug
        }
    }
`

interface GetLessonsQueryResponse {
    lessons: {
        id: string
        title: string
        slug: string
        map: any
        availableAt: string
        lessonType: 'live' | 'class'
    }
}[]

export function Sidebar(){

    const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)

    return (
        <aside className='w-[348px] bg-gray-700 p-6 border-l border-gray-600'>
            <span className='font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block'>
                Week Schedule
            </span>

            <div className='flex flex-col gap-8'>
                {data?.lessons.map((lesson: { id: Key | null | undefined; title: string; slug: string; availableAt: string | number | Date; lessonType: any; }) => {
                    return (
                        <Lessons
                            key = {lesson.id}
                            title = {lesson.title}
                            slug = {lesson.slug}
                            availableAt = {new Date(lesson.availableAt)}
                            type = {lesson.lessonType}
                        />
                    )
                })}
            </div>
        </aside>
    )
}