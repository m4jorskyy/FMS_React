//NewsletterForm.jsx

import {useEffect, useState} from "react";

export default function NewsletterForm() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [showAlert, setShowAlert] = useState(true)

    useEffect(() => {
        if (error === 'Dziękujemy za zapisanie się do newslettera!') {
            const timer = setTimeout(() => setShowAlert(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [error])


    const handleChange = (event) => {
        setEmail(event.target.value)
        setError('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!email.includes('@')) {
            setError('Niepoprawny format e-mail')
        } else {
            setError('Dziękujemy za zapisanie się do newslettera!')
            setEmail('')
            setShowAlert(true)
        }
    }

    const handleClose = () => {
        setShowAlert(false)
    }

    const alertStyle = {
        backgroundColor: '#333',
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        position: 'relative',
        margin: '1rem 0',
        width: '300px',
        height: error ? '225px' : '175px'
    }

    return (
        <>
            {showAlert && (
                <div style={alertStyle}>
                    <span className={"closebtn"} onClick={() => handleClose()}>&times;</span>
                    <form onSubmit={handleSubmit}>
                        <h3>Zapisz się do newslettera!</h3>
                        <input type={"email"} value={email} onChange={handleChange} placeholder={"E-mail"}/>
                        <br/>
                        <br/>
                        <button type={"submit"}>Zapisz się!</button>
                        {error && (<p>{error}</p>)}
                        {error === 'Dziękujemy za zapisanie się do newslettera!'}
                    </form>
                </div>
            )}
        </>
    )
}
