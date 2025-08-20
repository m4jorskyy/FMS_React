import {createContext, useContext, useState, useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {postLogout, getMe} from "../services/api.js";

const AuthContext = createContext(null)

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const queryClient = useQueryClient()

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getMe()
                setUser(data.nick)
                setRole(data.role)
            } catch {
                setUser(null)
                setRole(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const login = (userData, userRole) => {
        setUser(userData)
        setRole(userRole)
        queryClient.invalidateQueries()
    }

    const logout = async () => {
        try {
            await postLogout()
        } finally {
            setUser(null)
            setRole(null)
            queryClient.clear()
        }
    }

    return (
        <AuthContext.Provider value={{user, role, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}