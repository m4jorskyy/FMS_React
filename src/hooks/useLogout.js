//useLogout.js

import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function useLogout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { logout } = useAuth()

    const thanks = "Logged out successfully"
    const navigate = useNavigate()

    const handleLogout = async () => {
        setLoading(true)

        try {
            await logout()
            setSuccess(thanks)
            navigate("/")
        } catch (error) {
            setError(error.message || "Something went wrong. Try again.")
        } finally {
            setLoading(false)
        }
    }

    return {
        loading, error, success, handleLogout
    }
}