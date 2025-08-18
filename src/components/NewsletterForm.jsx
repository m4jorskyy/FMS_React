//NewsletterForm.jsx

import useNewsletter from "../hooks/useNewsletter.js";
import {X} from "lucide-react"

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
                <div className={"flex flex-col gap-3 mb-10 p-4"}>
                    <div className={"flex flex-row justify-between"}>
                        <h1 className={"text-[28px]"}>Join the circle<br/>Hear the whispers first</h1>
                        <X onClick={handleClose} className={"relative top-0 right-0 cursor-pointer"}/>
                    </div>
                    <form onSubmit={handleSubmit} className={"flex flex-col gap-3"}>
                        <input type={"email"} value={email} onChange={handleChange} placeholder={"E-mail"} className={"animate-pulseGlow outline-none text-center border-2"}/>
                        <button type={"submit"} className={"btn-shine"}>Sign up!</button>
                        {error && (<p>{error}</p>)}
                    </form>
                </div>
            )}
        </>
    )
}
