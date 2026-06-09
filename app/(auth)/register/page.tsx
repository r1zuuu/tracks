'use client'
import { authClient } from "@/lib/auth-client"
import { useState } from "react"



export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [fullName, setFullName] = useState("")


    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        const {data, error} = await authClient.signUp.email({
            email, name: fullName, password, callbackURL: "/dashboard"
        })
        console.log(email, password, fullName)
        if(error){
            setErrorMessage(error.message ?? 'Something went wrong')
        }
    }
    

    return (
        <div className="flex flex-col">
            <div>
                <h1 className="text-2xl font-bold">Register Page</h1>
                <form onSubmit={handleSubmit}>
                {errorMessage && <p>{errorMessage}</p>}
                <div className="mb-4">
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name"/>
                </div>
                <div className="mb-4">
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                </div>
                <div className="mb-4">
                    <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )


}