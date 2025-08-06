//Dashboard.jsx

import {useAuth} from "../context/AuthContext.jsx";

export default function Dashboard() {
    const {user, role} = useAuth()

    return (
        <div>
            {user}, {role}
        </div>
    )
}