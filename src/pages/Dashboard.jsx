//Dashboard.jsx

import {useAuth} from "../context/AuthContext.jsx";
import useUsers from "../hooks/useUsers.js";
import UserTable from "../components/UserTable.jsx";

export default function Dashboard() {
    const {user, role, token} = useAuth()
    const {data: users} = useUsers(token, {
        enabled: role === "ADMIN"
    })

    if (role === "ADMIN") return <UserTable users={users}/>

    return <h1>{user}, {role}</h1>
}