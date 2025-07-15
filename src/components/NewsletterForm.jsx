//NewsletterForm.jsx

import { useState } from "react";

export default function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const handleChange = (event) => {
        setEmail(event.target.value)
        setError('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!email.includes('@')) {
            setError('Niepoprawny format e-mail')
        } else {
            setEmail('')
            setError('Dziękujemy za zapisanie się do newslettera!')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type={"email"} value={email} onChange={handleChange} />
            <button type={"submit"}>Zapisz się!</button>
            <p>{error !== '' ? error : ''}</p>
        </form>
    )
}