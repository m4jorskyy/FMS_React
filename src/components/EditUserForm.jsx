//EditUserForm.jsx

import useEditUser from "../hooks/useEditUser.js";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../services/api.js";
import {useState} from "react";
import Alert from "./Alert.jsx";
import {X} from "lucide-react";

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
        setCurrentNick(newNick)
        onSuccess?.(newNick)
    }

    const {
        firstName,
        lastName,
        email,
        nick,
        role,
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
        handleRoleChange,
        handlePasswordChange,
        handlePasswordCheckChange
    } = useEditUser(userDetails || {}, handleEditSuccess)

    if (!userDetails) return null

    return (
        <div className={"flex flex-col items-center gap-3 w-[200px]"}>
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

            <div className={"flex flex-col items-center gap-2"}>
                <button type="button" onClick={onClose}>
                    <X/>
                </button>
            <h3>Change user info</h3>

            </div>

            <form onSubmit={handleEdit} className={"flex flex-col gap-2"}>
                <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                    disabled={loading}
                    className={"text-center animate-pulseGlow"}
                    placeholder={"First name"}
                />

                <input
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                    disabled={loading}
                    className={"text-center animate-pulseGlow"}
                    placeholder={"Last name"}
                />

                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    disabled={loading}
                    className={"text-center animate-pulseGlow"}
                    placeholder={"E-mail"}
                />
                <input
                    type="text"
                    value={nick}
                    onChange={handleNickChange}
                    required
                    disabled={loading}
                    className={"text-center animate-pulseGlow"}
                    placeholder={"Nick"}
                />
                <input
                    type="text"
                    value={role}
                    onChange={handleRoleChange}
                    required
                    disabled={loading}
                    className={"text-center animate-pulseGlow"}
                    placeholder={"Nick"}
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={loading}
                    className={"text-center animate-pulseGlow"}
                    placeholder={"password"}
                />
                <input
                    type="password"
                    value={passwordCheck}
                    onChange={handlePasswordCheckChange}
                    disabled={loading}
                    className={"text-center animate-pulseGlow"}
                    placeholder={"check password"}
                />
                <button type="submit" disabled={loading} className={"btn-shine"}>
                    {loading ? 'Saving chages...' : 'Save changes'}
                </button>
            </form>
        </div>
    )
}