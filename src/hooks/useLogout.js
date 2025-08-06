//useLogout.js

import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function useLogout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { logout } = useAuth()
    const navigate = useNavigate()

    const thanks = "Wylogowanie udane!"

    const handleLogout = () => {
        setLoading(true)

        try {
            logout()
            setSuccess(thanks)
            navigate("/")
        } catch (error) {
            setError(error.message || "Coś poszło nie tak. Spróbuj ponownie.")
        } finally {
            setLoading(false)
        }
    }

    return {
        loading, error, success, handleLogout
    }
}