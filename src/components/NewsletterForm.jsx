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

    return (
        <>
            {showAlert && (
                <div>
                    <span onClick={handleClose}>&times;</span>
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
