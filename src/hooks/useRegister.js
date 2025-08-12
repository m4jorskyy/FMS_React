//useRegister.js

import {useEffect, useState} from "react";
import {postRegister} from "../services/api.js";
import {useNavigate} from "react-router-dom";

export default function useRegister() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [nick, setNick] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const navigate=useNavigate()

    const thanks = "Dziękujemy za rejestrację!"

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
        setError("")
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
        setError("")
    }

    const handleNickChange = (e) => {
        setNick(e.target.value)
        setError("")
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setError("")
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setError("")
    }

    const handlePasswordCheckChange = (e) => {
        setPasswordCheck(e.target.value)
        setError("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        setSuccess("")
        if (!email.includes('@')) {
            setError('Nieprawidłowy format adresu e-mail!')
            setShowAlert(true)
            return
        }

        if (password !== passwordCheck) {
            setError('Hasła się nie zgadzają!')
            setShowAlert(true)
            return
        }

        setLoading(true)

        try {
            const response = await postRegister(firstName, lastName, nick, email, password)
            if (response.ok) {
                setSuccess(thanks)
                setShowAlert(true)
                setFirstName("")
                setLastName("")
                setNick("")
                setEmail("")
                setPassword("")
                setPasswordCheck("")
            }
        } catch (error) {
            if (error.data) {
                const errorMessages = Object.entries(error.data)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join('\n')
                setError(errorMessages)
            } else {
                setError(error.message || "Something went wrong. Try again.")
            }
            setShowAlert(true)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setShowAlert(false)
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                handleClose()
                navigate("/login")
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [success])

    return {
        firstName,
        lastName,
        email,
        nick,
        password,
        passwordCheck,
        error,
        success,
        loading,
        showAlert,
        handleSubmit,
        handleClose,
        handleFirstNameChange,
        handleLastNameChange,
        handleNickChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordCheckChange
    }
}