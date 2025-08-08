//useEditUser.js

import {useEffect, useState} from "react";
import {getUser, patchUser} from "../services/api.js";
import {useAuth} from "../context/AuthContext.jsx";
import {useQueryClient} from "@tanstack/react-query";

export default function useEditUser(user, onSuccess) {
    const [firstName, setFirstName] = useState(user.first_name || '')
    const [lastName, setLastName] = useState(user.last_name || '')
    const [nick, setNick] = useState(user.nick || '')
    const [email, setEmail] = useState(user.email || '')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const [prevNick, setPrevNick] = useState('')

    const {token} = useAuth()
    const queryClient = useQueryClient()

    const thanks = "Pomyślnie zmieniono dane!"

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

    const handleEdit = async (event) => {
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
            await patchUser(firstName, lastName, nick, email, password, token, prevNick)
            setSuccess(thanks)
            setShowAlert(true)

            if (nick !== prevNick) {
                queryClient.removeQueries(['user', prevNick])
                onSuccess?.(nick)
            }

            setTimeout(() => {
                window.location.reload()
            }, 1000)

            setFirstName("")
            setLastName("")
            setNick("")
            setEmail("")
            setPassword("")
            setPasswordCheck("")
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

    const handleClose = () => {
        setShowAlert(false)
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => handleClose(), 3000)
            return () => clearTimeout(timer)
        }
    }, [success])

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || '')
            setLastName(user.last_name || '')
            setNick(user.nick || '')
            setEmail(user.email || '')
            setPassword(user.password || '')
            setPasswordCheck(user.password || '')
        }
    }, [user])

    useEffect(() => {
        if (user.nick) {
            setPrevNick(user.nick)
        }
    }, [user.nick])

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
        handleEdit,
        handleClose,
        handleFirstNameChange,
        handleLastNameChange,
        handleNickChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordCheckChange
    }
}