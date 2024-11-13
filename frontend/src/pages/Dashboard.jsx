import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance] = useState(null)
    const getBalance = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setBalance(response.data.balance)
    }

    useEffect(()=>{
        getBalance()
    }, [])

    return (
        <div>
            <AppBar/>
            <div className="font-bold text-2xl m-4">
                <div>Your Balance <span>{Math.round(balance * 100) / 100}</span></div>
            </div>
            <Users />
        </div>
    )
}
