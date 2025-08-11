//EditUserForm.jsx

import useEditUser from "../hooks/useEditUser.js";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../services/api.js";
import {useState} from "react";

export default function EditUserForm({user, token, onSuccess, onClose}) {
    const [currentNick, setCurrentNick] = useState(user.nick)

    const {
        data: userDetails
    } = useQuery({
        queryKey: ['user', currentNick],
        queryFn: () => {
            return getUser(currentNick, token)
        },
        enabled: !!currentNick
    })

    const handleEditSuccess = (newNick) => {
        setCurrentNick(newNick)  // To zmieni query key i wywoła nowe zapytanie
        onSuccess?.(newNick)
    }

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
        handleEdit,
        handleClose,
        handleFirstNameChange,
        handleLastNameChange,
        handleNickChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordCheckChange
    } = useEditUser(userDetails || {}, handleEditSuccess)

    if (!userDetails) return null

    return (
        <>
            {showAlert ? (
                <div>
                    <p>{error || success}</p>
                    <button onClick={handleClose}>
                        ×
                    </button>
                </div>
            ) : null}
            <form onSubmit={handleEdit}>
                <h3>Zmień dane</h3>
                <button
                    type="button"
                    onClick={onClose}
                >
                    ✕ Zamknij
                </button>
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
                        disabled={loading}
                    />
                </label>
                <br/>
                <button type="submit" disabled={loading}>
                    {loading ? 'Zapisywanie zmian...' : 'Zapisz zmiany'}
                </button>
            </form>
        </>
    )
}