//useLogin.js

import {useState} from "react";
import {postLogin} from "../services/api.js";

export default function useLogin() {
    const [nick, setNick] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const thanks = "Logowanie udane!"

    const handleNickChange = (e) => {
        setNick(e.target.value)
        setError("")
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setError("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        setSuccess("")

        setLoading(true)

        try {
            const response = await postLogin(nick, password)
            if (response.ok) {
                setSuccess(thanks)
                setShowAlert(true)
                setNick("")
                setPassword("")
            }
        } catch (error) {
            if (error.data) {
                const errorMessages = Object.entries(error.data)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join('\n')
                setError(errorMessages)
            } else {
                setError(error.message || "Coś poszło nie tak. Spróbuj ponownie.")
            }
            setShowAlert(true)
        } finally {
            setLoading(false)
        }

    }

    return {
        nick,
        password,
        handleSubmit,
        handlePasswordChange,
        handleNickChange,
        error,
        success,
        loading,
        showAlert
    }
}