//useLogout.js

import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

export default function useLogout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { logout } = useAuth()

    const thanks = "Logged out successfully"

    const handleLogout = () => {
        setLoading(true)

        try {
            logout()
            setSuccess(thanks)
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