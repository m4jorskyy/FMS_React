//useLogin.js

import {useEffect, useState} from "react";
import {postLogin} from "../services/api.js";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function useLogin() {
    const [nick, setNick] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const thanks = "Login successful!"

    const {login} = useAuth()
    const navigate = useNavigate()

    const handleNickChange = (e) => {
        setShowAlert(false)
        setNick(e.target.value)
        setError("")
    }

    const handlePasswordChange = (e) => {
        setShowAlert(false)
        setPassword(e.target.value)
        setError("")
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        setError("")
        setSuccess("")
        setShowAlert(false)
        setLoading(true)

        try {
            const response = await postLogin(nick, password)
            login(response.nick, response.token, response.role)
            setSuccess(thanks)
            setShowAlert(true)
            setNick("")
            setPassword("")

        } catch (error) {
            if (error.data) {
                setError(error.message || "Something went wrong. Try again.")
            }
            setShowAlert(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                navigate("/dashboard")
            }, 2000)

            return () => clearTimeout(timeout)
        }
    }, [success, navigate])

    return {
        nick,
        password,
        handleLogin,
        handlePasswordChange,
        handleNickChange,
        error,
        success,
        loading,
        showAlert
    }
}