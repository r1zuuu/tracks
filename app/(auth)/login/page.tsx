'use client'
import { authClient } from "@/lib/auth-client"
import { useState } from "react"



export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        const {data, error} = await authClient.signIn.email({
            email, password, callbackURL: "/dashboard"
        })
        if(error){
            setErrorMessage(error.message ?? 'Something went wrong')
        }
    }


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                {errorMessage && <p>{errorMessage}</p>}
                <div>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )


}