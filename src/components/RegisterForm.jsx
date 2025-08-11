//RegisterForm.jsx

import useRegister from "../hooks/useRegister.js";

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
        <div>
            {showAlert ? (
                <div>
                    <p>{error || success}</p>
                    <button onClick={handleClose}>
                        ×
                    </button>
                </div>
            ) : null}

            <form onSubmit={handleSubmit} className={"flex flex-col items-center"}>
                <h1>REGISTER</h1>
                <br />
                <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                    disabled={loading}
                    placeholder={"first name"}
                    className={"placeholder: text-center"}
                />

                <input
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                    disabled={loading}
                    placeholder={"last name"}
                    className={"placeholder: text-center"}
                />



                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    disabled={loading}
                    placeholder={"email"}
                    className={"placeholder: text-center"}
                />



                <input
                    type="text"
                    value={nick}
                    onChange={handleNickChange}
                    required
                    disabled={loading}
                    placeholder={"nick"}
                    className={"placeholder: text-center"}
                />

                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    disabled={loading}
                    placeholder={"password"}
                    className={"placeholder: text-center"}
                />

                <input
                    type="password"
                    value={passwordCheck}
                    onChange={handlePasswordCheckChange}
                    required
                    disabled={loading}
                    placeholder={"Password check"}
                    className={"placeholder: text-center"}
                />
                <br />

                <button type="submit" disabled={loading} className={"cursor-pointer"}>
                    {loading ? '' : 'Register'}
                </button>
            </form>
        </div>
    )
}