import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { InputField } from "../components/InputField"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onSubmit = async () => {
        const response = await axios({
            method: "post",
            url: "http://localhost:3000/api/v1/user/signin",
            data:{
                username: email,
                password: password
            }
        })
        localStorage.setItem("token", response.data.token)
        navigate('/dashboard')
    }

    return (
        <div className="flex justify-center items-center h-[100vh] bg-gray-300">
            <div className="text-center px-5 py-6 rounded-md bg-white w-[25%]">
                <Heading text={"Sign In"} />
                <SubHeading text={"Enter your credentials to access your account"}/>
                <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@example.com"/>
                <InputField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button text="Sign In" onClick={onSubmit}/>
                <div className="font-semibold pt-2">Dont have an account? <Link to="/signup" className="underline">Sign Up</Link></div>
            </div>
        </div>
    )
}