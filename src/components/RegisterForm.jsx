//RegisterForm.jsx

import useRegister from "../hooks/useRegister.js";

export default function RegisterForm(){
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
            ) : null }

            <form onSubmit={handleSubmit}>
                <h3>Zarejestruj się!</h3>

                <label>
                    Imię:
                    <input
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                        disabled={loading}
                    />
                </label>
                <br/>

                <label>
                    Nazwisko
                    <input
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                        disabled={loading}
                    />
                </label>
                <br/>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        disabled={loading}
                    />
                </label>
                <br/>
                <label>
                    Nick
                    <input
                        type="text"
                        value={nick}
                        onChange={handleNickChange}
                        required
                        disabled={loading}
                    />
                </label>
                <br/>
                <label>
                    Hasło
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        disabled={loading}
                    />
                </label>
                <br/>
                <label>
                    Powtórz hasło
                    <input
                        type="password"
                        value={passwordCheck}
                        onChange={handlePasswordCheckChange}
                        required
                        disabled={loading}
                    />
                </label>
                <br/>
                <button type="submit" disabled={loading}>
                    {loading ? 'Rejestracja...' : 'Zarejestruj się'}
                </button>
            </form>
        </div>
    )
}