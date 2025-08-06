//AuthContext.jsx

import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null)

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    })

    const [token, setToken] = useState(() => {
        try {
            const storedToken = localStorage.getItem("token");
            return storedToken && storedToken !== "undefined" ? JSON.parse(storedToken) : null;
        } catch {
            return null;
        }
    })

    const [role, setRole] = useState(() => {
        try {
            const storedRole = localStorage.getItem("role")
            return storedRole && storedRole !== "undefined" ? JSON.parse(storedRole) : null
        }  catch {
            return null
        }
    })

    const login = (userData, accessToken, userRole) => {
        setUser(userData)
        setToken(accessToken)
        setRole(userRole)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', JSON.stringify(accessToken))
        localStorage.setItem('role', JSON.stringify(userRole))
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setRole(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    return (
        <AuthContext.Provider value={{user, token, role, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}