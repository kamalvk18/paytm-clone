import { useState, useEffect } from "react"
import axios from "axios"

export const useUsers = (filter) => {
    const [users, setUsers] = useState(null)
    const [loading, toggleLoading] = useState(true)

    const getUsers = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setUsers(response.data.users || [])
        toggleLoading(false)
    }

    useEffect(()=>{
        const id = setTimeout(()=>{
            getUsers();
        }, 500)
        return ()=> clearTimeout(id)
    }, [filter])

    return {users, loading}
}