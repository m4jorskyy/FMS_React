//RegisterForm.jsx

import useRegister from "../hooks/useRegister.js";
import Alert from "./Alert.jsx";

export default function RegisterForm() {
    const {
        firstName,
        lastName,
        email,
        nick,
        password,
        passwordCheck,
        error,
        success,
        loading,
        showAlert,
        handleSubmit,
        handleClose,
        handleFirstNameChange,
        handleLastNameChange,
        handleNickChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordCheckChange
    } = useRegister()

    return (
        <div className={"flex flex-col items-center w-full min-h-screen scrollbar-hide z-0"}>

            <form onSubmit={handleSubmit} className={"flex flex-col items-center justify-center gap-4"}>
                <h1 className={"text-[64px] px-4 text-center"}>Carve your name in the shadow</h1>
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
                <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                    disabled={loading}
                    placeholder={"first name"}
                    className={"placeholder: text-center animate-pulseGlow border-2 outline-none text-[32px]"}
                />

                <input
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                    disabled={loading}
                    placeholder={"last name"}
                    className={"placeholder: text-center animate-pulseGlow border-2 outline-none text-[32px]"}
                />


                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    disabled={loading}
                    placeholder={"email"}
                    className={"placeholder: text-center animate-pulseGlow border-2 outline-none text-[32px]"}
                />


                <input
                    type="text"
                    value={nick}
                    onChange={handleNickChange}
                    required
                    disabled={loading}
                    placeholder={"nick"}
                    className={"placeholder: text-center animate-pulseGlow border-2 outline-none text-[32px]"}
                />

                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    disabled={loading}
                    placeholder={"password"}
                    className={"placeholder: text-center animate-pulseGlow border-2 outline-none text-[32px]"}
                />

                <input
                    type="password"
                    value={passwordCheck}
                    onChange={handlePasswordCheckChange}
                    required
                    disabled={loading}
                    placeholder={"Password check"}
                    className={"placeholder: text-center animate-pulseGlow border-2 outline-none text-[32px]"}
                />
                <br/>

                <button type="submit" disabled={loading} className={"btn-shine text-[48px]"}>REGISTER</button>
            </form>
        </div>
    )
}