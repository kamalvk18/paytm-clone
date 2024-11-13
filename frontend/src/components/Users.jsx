import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { Icon } from "./Icon"
import { Button } from "./Button"
import { SearchBar } from "./SearchBar"

import { useUsers } from "../hooks/useUsers"

export const Users = () => {
    const [filter, setFilter] = useState('')
    const {users, loading} = useUsers(filter);
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