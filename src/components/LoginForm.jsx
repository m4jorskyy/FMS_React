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
        <>
            {showAlert ? (
                <div>
                    <p>{error || success}</p>
                </div>
            ) : null}

            {loading ? (
                <div className={"animate-l1"}>
                    <img src={"/src/assets/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                </div>
            ) : null}

            <form onSubmit={handleLogin} className={"flex flex-col items-center"}>
                <h3>LOG IN</h3>
                <input className={"text-center placeholder:text-center"} name={"nick"} type={"text"} value={nick}
                       onChange={handleNickChange} placeholder={"Nick"}/>
                <input className={"text-center placeholder:text-center"} name={"password"} type={"password"}
                       value={password} onChange={handlePasswordChange} placeholder={"Password"}/>
                <input type={"submit"} value={"LOG IN"}/>
            </form>

        </>
    )
}