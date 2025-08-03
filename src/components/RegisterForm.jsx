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
        <div className="register-form-container">
            {showAlert ? (
                <div className={`alert ${error ? 'alert--error' : 'alert--success'}`}>
                    <p>{error || success}</p>
                    <button className="alert__close" onClick={handleClose} aria-label="Close">
                        ×
                    </button>
                </div>
            ) : null }

            <form className="register-form" onSubmit={handleSubmit} noValidate>
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
                <button type="submit" disabled={loading} className="btn-submit">
                    {loading ? 'Rejestracja...' : 'Zarejestruj się'}
                </button>
            </form>
        </div>
    )
}