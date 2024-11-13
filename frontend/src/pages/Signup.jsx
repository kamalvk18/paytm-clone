import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

import { InputField } from "../components/InputField"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onSubmit = async () => {
        const response = await axios({
            method: "post",
            url: "http://localhost:3000/api/v1/user/signup",
            data:{
                username: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            }
        })
        localStorage.setItem("token", response.data.token)
        navigate('/dashboard')
    }

    return (
        <div className="flex justify-center items-center h-[100vh] bg-gray-300">
            <div className="text-center px-5 py-6 rounded-md bg-white w-[25%]">
                <Heading text={"Sign Up"} />
                <SubHeading text={"Enter your information to create an account"}/>
                <InputField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John"/>
                <InputField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe"/>
                <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@example.com"/>
                <InputField label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <Button text="Sign Up" onClick={onSubmit}/>
                <div className="font-semibold pt-2">Already have an account? <Link to="/signin" className="underline">Sign In</Link></div>
            </div>
        </div>
    )
}