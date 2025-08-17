import useLogin from "../hooks/useLogin.js";
import Alert from "./Alert.jsx";

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
        <div className={"flex flex-col justify-center items-center h-screen overflow-hidden w-full -mt-24"}>
            {showAlert ? (
                <Alert type={error === "" ? "success" : "error"} message={error === "" ? success : error}/>
            ) : null}

            {loading ? (
                <div className={"animate-l1"}>
                    <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                </div>
            ) : null}

            <form onSubmit={handleLogin} className={"flex flex-col items-center"}>
                <h3>LOG IN</h3>
                <br />
                <input className={"text-center placeholder:text-center"} name={"nick"} type={"text"} value={nick}
                       onChange={handleNickChange} placeholder={"Nick"}/>
                <input className={"text-center mt-2 placeholder:text-center"} name={"password"} type={"password"}
                       value={password} onChange={handlePasswordChange} placeholder={"Password"}/>
                <br />
                <button type={"submit"} className={"btn-shine"} disabled={loading}>LOG IN</button>
            </form>

        </div>
    )
}