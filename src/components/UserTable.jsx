import {useEffect, useMemo, useState} from "react";
import {debounce} from 'lodash';
import useDeleteUser from "../hooks/useDeleteUser.js";
import EditUserForm from "./EditUserForm.jsx";
import {Trash2, Pencil} from 'lucide-react';
import Alert from "./Alert.jsx";

export default function UserTable({
                                      users,
                                      fetchNextPage,
                                      hasNextPage,
                                      isFetchNextPage,
                                      isLoading,
                                      error,
                                      isError,
                                      token
                                  }) {
    const userPage = useMemo(() => {
        return users?.pages?.flatMap(page => page.results) || []
    }, [users?.pages])

    const [sorting, setSorting] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    const [localCurrentPage, setLocalCurrentPage] = useState(1)
    const [localPageSize] = useState(5)

    const [editingUser, setEditingUser] = useState(null)
    const [showEditForm, setShowEditForm] = useState(false)

    const [open, setOpen] = useState(false)

    function handleEditClick(user) {
        setEditingUser(user)
        setShowEditForm(true)
    }

    const debouncedSetSearch = useMemo(
        () => debounce((value) => setDebouncedSearch(value), 300),
        []
    )

    useEffect(() => {
        debouncedSetSearch(searchTerm)
    }, [searchTerm, debouncedSetSearch])

    useEffect(() => {
        return () => {
            debouncedSetSearch.cancel()
        }
    }, [debouncedSetSearch])

    const filteredUsers = useMemo(() => {
        if (!debouncedSearch.trim()) return userPage

        const search = debouncedSearch.toLowerCase()
        return userPage.filter(user =>
            user.first_name?.toLowerCase().includes(search) ||
            user.last_name?.toLowerCase().includes(search) ||
            user.nick?.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search) ||
            user.role?.toLowerCase().includes(search)
        )
    }, [userPage, debouncedSearch])

    useEffect(() => {
        const minRequiredResults = localPageSize * 2;

        const shouldAutoLoad =
            hasNextPage &&
            !isFetchNextPage &&
            filteredUsers.length < minRequiredResults;

        if (shouldAutoLoad) {
            fetchNextPage();
        }
    }, [filteredUsers.length, hasNextPage, isFetchNextPage, localPageSize, fetchNextPage])

    useEffect(() => {
        setLocalCurrentPage(1)
    }, [debouncedSearch])

    const sortedAndFilteredUsers = useMemo(() => {
        if (!sorting.length) return filteredUsers

        return [...filteredUsers].sort((a, b) => {
            const {id: sortKey, desc} = sorting[0]
            const aVal = a[sortKey] || ''
            const bVal = b[sortKey] || ''

            if (desc) return bVal.localeCompare(aVal)
            return aVal.localeCompare(bVal)
        })
    }, [filteredUsers, sorting])

    const paginatedUsers = useMemo(() => {
        const startIndex = (localCurrentPage - 1) * localPageSize
        const endIndex = startIndex + localPageSize
        return sortedAndFilteredUsers.slice(startIndex, endIndex)
    }, [sortedAndFilteredUsers, localCurrentPage, localPageSize])

    const totalLocalPages = Math.ceil(sortedAndFilteredUsers.length / localPageSize)

    const {error: deleteUserError, success, loading, handleDelete} = useDeleteUser()

    useEffect(() => {
        if (localCurrentPage > totalLocalPages && totalLocalPages > 0) {
            setLocalCurrentPage(totalLocalPages)
        }
    }, [localCurrentPage, totalLocalPages])

    const handlePageChange = (newPage) => {
        setLocalCurrentPage(newPage)

        const remainingPages = totalLocalPages - newPage
        if (remainingPages <= 1 && hasNextPage && !isFetchNextPage) {
            fetchNextPage()
        }
    }

    function handleEditSuccess(newNick) {
        setEditingUser(prev => ({
            ...prev,
            nick: newNick
        }))
    }

    function handleCloseEditForm() {
        setShowEditForm(false)
        setEditingUser(null)
    }

    return (
        <div>
            <button onClick={() => setOpen(!open)} className={"btn-shine"}>User table</button>
            <div
                className={`rounded-lg flex pr-6 flex-col w-screen text-center gap-2 overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-250 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>

                {isError ? (
                    <Alert type={"error"} message={error}/>
                ) : null}

                {loading || isLoading ? (
                    <div className={"animate-l1"}>
                        <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                    </div>
                ) : null}

                {deleteUserError !== "" ? (
                    <Alert type={"error"} message={deleteUserError}/>
                ) : null}

                {success !== "" ? (
                    <Alert type={"success"} message={success}/>
                ) : null}

                <div className={"flex flex-col border-2 rounded-lg p-2 gap-2"}>
                    <h1>User Table</h1>
                    <div>
                        <input
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search users"
                            className={"placeholder: text-center outline-0"}
                        />
                    </div>

                    <div className={"flex flex-row gap-2 overflow-x-scroll scrollbar-hide items-start"}>
                        <table className={"border-2 border-dashed border-collapse text-center"}>
                            <thead>
                            <tr className={"border-2 border-dashed"}>
                                <th
                                    onClick={() => setSorting([{
                                        id: 'first_name',
                                        desc: sorting[0]?.id === 'first_name' ? !sorting[0]?.desc : false
                                    }])}
                                    className={"cursor-pointer border-2 border-dashed  p-2"}
                                >
                                    First name {sorting[0]?.id === 'first_name' && (sorting[0]?.desc ? '↓' : '↑')}
                                </th>
                                <th
                                    onClick={() => setSorting([{
                                        id: 'last_name',
                                        desc: sorting[0]?.id === 'last_name' ? !sorting[0]?.desc : false
                                    }])}
                                    className={"cursor-pointer border-2 border-dashed border-collapse p-2"}
                                >
                                    Last name {sorting[0]?.id === 'last_name' && (sorting[0]?.desc ? '↓' : '↑')}
                                </th>
                                <th
                                    onClick={() => setSorting([{
                                        id: 'nick',
                                        desc: sorting[0]?.id === 'nick' ? !sorting[0]?.desc : false
                                    }])}
                                    className={"cursor-pointer border-2 border-dashed border-collapse p-2"}
                                >
                                    Nick {sorting[0]?.id === 'nick' && (sorting[0]?.desc ? '↓' : '↑')}
                                </th>
                                <th
                                    onClick={() => setSorting([{
                                        id: 'email',
                                        desc: sorting[0]?.id === 'email' ? !sorting[0]?.desc : false
                                    }])}
                                    className={"cursor-pointer border-2 border-dashed border-collapse p-2"}
                                >
                                    E-mail {sorting[0]?.id === 'email' && (sorting[0]?.desc ? '↓' : '↑')}
                                </th>
                                <th
                                    onClick={() => setSorting([{
                                        id: 'role',
                                        desc: sorting[0]?.id === 'role' ? !sorting[0]?.desc : false
                                    }])}
                                    className={"cursor-pointer  p-2"}
                                >
                                    Role {sorting[0]?.id === 'role' && (sorting[0]?.desc ? '↓' : '↑')}
                                </th>
                                <th className={"border-2 border-dashed border-collapse p-2"}>
                                    DELETE
                                </th>
                                <th className={" p-2"}>
                                    EDIT
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedUsers.map((user, index) => (
                                <tr key={user.id || index}>
                                    <td className={"border-2 border-dashed p-2"}>{user.first_name}</td>
                                    <td className={"border-2 border-dashed p-2"}>{user.last_name}</td>
                                    <td className={"border-2 border-dashed p-2"}>{user.nick}</td>
                                    <td className={"border-2 border-dashed p-2"}>{user.email}</td>
                                    <td className={"border-2 border-dashed p-2"}>{user.role}</td>
                                    <td className={"border-2 border-dashed p-2"}>
                                        <button onClick={() => handleDelete(user.nick)} className={"btn-shine"}>
                                            <Trash2/>
                                        </button>
                                    </td>
                                    <td className={"border-2 border-dashed border-collapse p-2"}>
                                        <button onClick={() => {
                                            handleEditClick(user)
                                            setShowEditForm(!showEditForm)
                                        }} className={"btn-shine"}><Pencil/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <button
                            onClick={() => handlePageChange(Math.max(1, localCurrentPage - 1))}
                            disabled={localCurrentPage === 1}
                            className={"border-2 rounded-lg p-2"}
                        >
                            Previous page
                        </button>

                        <span> Page {localCurrentPage} of {totalLocalPages} </span>

                        <button
                            onClick={() => handlePageChange(Math.min(totalLocalPages, localCurrentPage + 1))}
                            disabled={localCurrentPage === totalLocalPages}
                            className={"border-2 rounded-lg p-2"}
                        >
                            Next page
                        </button>
                    </div>

                    <div className={`overflow-hidden w-[240px] transition-all duration-500 ease-in-out ${showEditForm ? "max-h-300 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"} text-center border-2 rounded-lg p-4`}>
                        {showEditForm && editingUser && (
                            <EditUserForm user={editingUser} token={token} onSuccess={handleEditSuccess}
                                          onClose={handleCloseEditForm}/>
                        )}
                    </div>


                </div>
            </div>
        </div>
    )
}