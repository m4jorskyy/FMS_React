//useEditUser.js

import {useEffect, useState} from "react";
import {patchUser} from "../services/api.js";
import {useQueryClient} from "@tanstack/react-query";

export default function useEditUser(user, onSuccess) {
    const [firstName, setFirstName] = useState(user.first_name || '')
    const [lastName, setLastName] = useState(user.last_name || '')
    const [nick, setNick] = useState(user.nick || '')
    const [email, setEmail] = useState(user.email || '')
    const [role, setRole] = useState(user.role || '')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const [prevNick, setPrevNick] = useState('')

    const queryClient = useQueryClient()

    const thanks = "User changed successfully"

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

    const handleRoleChange = (e) => {
        setRole(e.target.value)
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
            setError('Wrong e-mail format!')
            setShowAlert(true)
            return
        }

        if (password !== passwordCheck) {
            setError("Passwords don't match!")
            setShowAlert(true)
            return
        }

        setLoading(true)

        try {
            await patchUser(firstName, lastName, nick, email, role, password, prevNick)
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
            setRole("")
            setPassword("")
            setPasswordCheck("")
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
            setRole(user.role || '')
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
        role,
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
        handleRoleChange,
        handlePasswordChange,
        handlePasswordCheckChange
    }
}