import { useSearchParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

import { SearchBar } from "../components/SearchBar"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"

export const SendMoney = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const name = searchParams.get("name")

    const [amount, setAmount] = useState(null)
    const transferMoney = async () => {
        await axios({
            method: "post",
            url: "http://localhost:3000/api/v1/account/transfer",
            data:{
                to: id,
                amount: amount
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        navigate('/dashboard')
    }

    return (
        <div className="flex justify-center items-center h-[100vh] bg-gray-300">
            <div className="bg-white text-center p-8 w-[25%] rounded-md">
                <Heading text={"Send Money"} />
                <div className="flex mt-4">
                    <div className={"text-2xl font-bold bg-green-500 text-white rounded-full h-12 w-12 flex justify-center items-center"}>A</div>
                    <div className="text-2xl font-bold my-auto ml-3">{name}</div>
                </div>
                <div className="font-semibold text-xl text-left mt-3">Amount</div>
                <SearchBar value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={"Enter amount"}/>
                <div className="mt-2"><Button text={"Initiate transfer"} type={"Success"} onClick={transferMoney}/></div>
            </div>
        </div>
    )
}