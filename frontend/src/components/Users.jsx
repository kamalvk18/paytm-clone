import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

import { Icon } from "./Icon"
import { Button } from "./Button"
import { SearchBar } from "./SearchBar"

export const Users = () => {
    const [users, setUsers] = useState(null)
    const [filter, setFilter] = useState('')
    const [loading, toggleLoading] = useState(true)

    const getUsers = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setUsers(response.data.users)
        toggleLoading(false)
    }

    useEffect(()=>{
        const id = setTimeout(()=>{
            getUsers();
        }, 500)
        return ()=> clearTimeout(id)
    }, [filter])
    
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className="m-4">
                    <div className="font-bold text-2xl">Users</div>
                    <SearchBar onChange={(e) => {setFilter(e.target.value)}} placeholder={"Search users.."}/>
                </div>
                <div className="mx-4 mt-7">
                    {users.map((user)=>{
                        const iconText = user.firstName[0].toUpperCase()+user.lastName[0].toUpperCase()
                        return (
                            <div className="flex justify-between mt-2">
                                <div className="flex">
                                    <Icon text={iconText}/>
                                    <div className="font-semibold text-xl ml-3 mt-1.5">{user.username}</div>
                                </div>
                                <div className="w-[8%]">
                                    <Button text={"Send money"} onClick={()=>{navigate(`/sendmoney?id=${user._id}&name=${user.firstName}`)}}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}