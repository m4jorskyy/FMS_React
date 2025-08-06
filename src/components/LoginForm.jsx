import useLogin from "../hooks/useLogin.js";

export default function LoginForm() {
    const {
        nick,
        password,
        loading,
        showAlert,
        success,
        error,
        handleLogin,
        handleNickChange,
        handlePasswordChange
    } = useLogin()

    return (
        <div className={"login-form-containter"}>
            {showAlert ? (
                <div className={`alert ${error ? 'alert--error' : 'alert--success'}`}>
                    <p>{error || success}</p>
                </div>
            ) : null}

            <form className={"login-form"} onSubmit={handleLogin}>
                <h3>Zaloguj się!</h3>

                <label>
                    Nick:
                    <input type={"text"} value={nick} onChange={handleNickChange} placeholder={"Nick"}/>
                </label>
                <br/>

                <label>
                    Password:
                    <input type={"password"} value={password} onChange={handlePasswordChange} placeholder={"Password"}/>
                </label>
                <br/>
                <input type={"submit"} value={"Zaloguj sie"}/>
            </form>

        </div>
    )
}