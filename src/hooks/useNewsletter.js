//useNewsletter.js

import {useState, useEffect} from 'react'
import {postNewsletter} from "../services/api.js";

export default function useNewsletter() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showAlert, setShowAlert] = useState(true)
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        setEmail(e.target.value)
        setError('')
        setSuccess('')
    }

    const thanks = 'Thank you for signing in newsletter'

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            await postNewsletter(email)
            setSuccess(thanks)
            setShowAlert(true)
            setEmail("")

        } catch (error) {
            const errorMessages = Object.entries(error.data)
                .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                .join('\n')
            setError(errorMessages)
            setShowAlert(true)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setShowAlert(false)
    }

    useEffect(() => {
        if (success === thanks) {
            const timer = setTimeout(() => handleClose(), 3000)
            return () => clearTimeout(timer)
        }
    }, [success])

    return {
        email, error, loading, showAlert, success, handleChange, handleSubmit, handleClose
    }
}