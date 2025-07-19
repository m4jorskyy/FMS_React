//NewsletterForm.jsx

import useNewsletter from "../hooks/useNewsletter.js";

export default function NewsletterForm() {
    const {
        email,
        error,
        showAlert,
        handleChange,
        handleSubmit,
        handleClose
    } = useNewsletter();

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
                    <span className={"closebtn"} onClick={handleClose}>&times;</span>
                    <form onSubmit={handleSubmit}>
                        <h3>Zapisz się do newslettera!</h3>
                        <input type={"email"} value={email} onChange={handleChange} placeholder={"E-mail"}/>
                        <br/>
                        <br/>
                        <button type={"submit"}>Zapisz się!</button>
                        {error && (<p>{error}</p>)}
                    </form>
                </div>
            )}
        </>
    )
}
