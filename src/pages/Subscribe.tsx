import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

const CREATE_SUBSCRIBER_MUTATION = gql`
    mutation CreateSubscriber ($name: String!, $email: String!) {
        createSubscriber(data: {name: $name, email: $email}) {
            id
        }
    }
`

export function Subscribe() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

     async function handleSubscriber(event: FormEvent) {
        event.preventDefault()

        await createSubscriber({
            variables: {
                name,
                email,
            }
        })
        
        navigate('event/lesson/opening-react-week')
    }

    return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
        <img src="/src/assets/reactjs.svg" className="w-[600px] absolute top-[80px]" alt="" />
        <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
            <div className="max-w-[640px]">
                <Logo />

                <h1 className="mt-8 text-[2.5rem] leading-tight">
                    Code a <strong className="text-blue-500">complete application</strong> from scratch with <strong className="text-blue-500">React</strong>
                </h1>
                <p className="mt-4 text-gray-200 leading-relaxed">
                    In just one week you will master in practice one of the most used technologies and with high demand to access the best opportunities on the market.
                </p>
            </div>
                
            <div className="p-8 bg-gray-700 border border-gray-500 rounded w-[350px]">
                <strong className="text-2xl mb-6 block">
                    Sign up entirely for free
                </strong>
                
                <form onSubmit={handleSubscriber} className="flex flex-col gap-2 w-full">
                    <input 
                        className="bg-gray-900 rounded px-5 h-14"
                        type="text" 
                        placeholder="Your full name" 
                        onChange={event => setName(event.target.value)}
                    />

                    <input 
                        className="bg-gray-900 rounded px-5 h-14"
                        type="email" 
                        placeholder="Type your e-mail" 
                        onChange={event => setEmail(event.target.value)}
                    />  

                    <button
                        disabled={loading}
                        className="mt-4 text-1xl bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50" 
                        type="submit"
                    >
                        Secure my spot
                    </button>
                </form>
            </div>
        </div>

        <img src="/src/assets/code-mockup.png" className="mt-10" alt="React Coding Background" />
    </div>
    )
}