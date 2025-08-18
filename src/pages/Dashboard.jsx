//Dashboard.jsx

import {useAuth} from "../context/AuthContext.jsx";
import useUsers from "../hooks/useUsers.js";
import UserTable from "../components/UserTable.jsx";
import CreatePlayerForm from "../components/CreatePlayerForm.jsx";
import CreatePost from "../components/CreatePost.jsx";

export default function Dashboard() {
    const {user, role, token} = useAuth()
    const {data: users, fetchNextPage, hasNextPage, isFetchNextPage, isLoading, error} = useUsers(token, {
        enabled: role === "ADMIN"
    })

    if (role === "ADMIN") return (
        <div className={"flex flex-col w-screen px-4 gap-4"}>
            <UserTable users={users} error={error} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}
                     isFetchNextPage={isFetchNextPage} isLoading={isLoading} token={token}/>
            <CreatePlayerForm />
            <CreatePost />
        </div>)

    if (role === "EDITOR") return (
        <CreatePost />
    )

    return <h1>{user}, {role}</h1>
}