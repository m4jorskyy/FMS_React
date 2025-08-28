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
        handleClose,
        handleNickChange,
        handlePasswordChange
    } = useLogin()

    return (
        <div className={"flex flex-col justify-center items-center h-screen overflow-hidden w-full -mt-24"}>
            <form onSubmit={handleLogin} className={"flex flex-col items-center justify-center gap-3"}>
                <h1 className={"text-[64px] px-4 text-center"}>Whispers know your name</h1>
                {showAlert ? (
                    <div onClick={handleClose}>
                        <Alert type={error === "" ? "success" : "error"} message={error === "" ? success : error}/>
                    </div>
                ) : null}

                {loading ? (
                    <div className={"animate-l1"}>
                        <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                    </div>
                ) : null}

                <br/>

                <input
                    className={"text-center placeholder:text-center animate-pulseGlow border-2 outline-none text-[32px] w-[95vw] sm:w-[30vw]"}
                    name={"nick"} type={"text"} value={nick}
                    onChange={handleNickChange} placeholder={"Nick"}
                    required
                />
                <input
                    className={"text-center mt-2 placeholder:text-center animate-pulseGlow border-2 outline-none text-[32px] w-[95vw] sm:w-[30vw]"}
                    name={"password"} type={"password"}
                    value={password} onChange={handlePasswordChange} placeholder={"Password"}
                    required
                />
                <br/>
                <button type={"submit"} className={"btn-shine text-[48px]"} disabled={loading || success}>LOG IN
                </button>
            </form>

        </div>
    )
}