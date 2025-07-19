//useNewsletter.js

import { useState, useEffect } from 'react'

function useNewsletter() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [showAlert, setShowAlert] = useState(true)

    const handleChange = (e) => {
        setEmail(e.target.value)
        setError('')
    }

    const thanks = 'Dziękujemy za zapisanie się do newslettera!'

    const handleSubmit = (event) => {
        event.preventDefault()
        if(email.includes('@')) {
            setError(thanks)
            setEmail('')
            setShowAlert(true)
        } else {
            setError('Nieprawidłowy format adresu e-mail!')
        }
    }

    const handleClose = () => {
        setShowAlert(false)
    }

    useEffect(() => {
        if(error === thanks) {
            const timer = setTimeout(() => handleClose(), 3000)
            return () => clearTimeout(timer)
        }
    }, [error])

    return {
        email, error, showAlert, handleChange, handleSubmit, handleClose
    }
}

export default useNewsletter;