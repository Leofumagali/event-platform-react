import { isPast, format } from "date-fns";
import { CheckCircle, Lock } from "phosphor-react";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
    title: string
    slug: string
    availableAt: Date
    type: 'live' | 'class'
}

export function Lessons(props: LessonProps){

    const {slug} = useParams<{slug: string}>()

    const isLessonAvailable = isPast(props.availableAt)

    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd MMMM' • 'k'h'mm")

    const isActiveLesson = slug == props.slug


    return(
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span className='text-gray-300'>
                {availableDateFormatted}
            </span>

            <div className={` rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 
            ${isActiveLesson ? 'bg-green-500' : ''} `}
            >
                <header className='flex items-center justify-between'>
                    {isLessonAvailable ? (
                        <span className={`text-sm text-blue-500 font-medium flex items-center gap-2 ${isActiveLesson ? '' : ''}`}>
                            <CheckCircle size={20} />
                            Released Lesson
                        </span>
                    ) : (
                        <span className='text-sm text-orange-500 font-medium flex items-center gap-2'>
                            <Lock size={20} />
                            Coming Soon
                        </span>
                    )}


                    <span className='text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold'>
                        {props.type === 'live' ? 'LIVE' : 'CLASS'}
                    </span>
                </header>
                <strong className={`text-gray-200 mt-5 block ${isActiveLesson ? 'text-gray-50' : ''}`}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}