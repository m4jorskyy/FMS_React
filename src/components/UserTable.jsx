import {useEffect, useMemo, useState} from "react";
import {debounce} from 'lodash';
import useDeleteUser from "../hooks/useDeleteUser.js";
import EditUserForm from "./EditUserForm.jsx";
import {Trash2, Pencil} from 'lucide-react';

export default function UserTable({users, fetchNextPage, hasNextPage, isFetchNextPage, isLoading, error, token}) {
    // Memoize user data to prevent unnecessary re-renders
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

    function handleEditClick(user) {
        setEditingUser(user)
        setShowEditForm(true)
    }


    // Lodash debounced function
    const debouncedSetSearch = useMemo(
        () => debounce((value) => setDebouncedSearch(value), 300),
        []
    )

    // Update debounced search when searchTerm changes
    useEffect(() => {
        debouncedSetSearch(searchTerm)
    }, [searchTerm, debouncedSetSearch])

    // Cleanup debounced function on unmount
    useEffect(() => {
        return () => {
            debouncedSetSearch.cancel()
        }
    }, [debouncedSetSearch])

    // Local filtering
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

    // Automatyczne ładowanie kolejnych stron
    useEffect(() => {
        const minRequiredResults = localPageSize * 3; // Trzymamy bufor 3 stron

        const shouldAutoLoad =
            hasNextPage &&
            !isFetchNextPage &&
            filteredUsers.length < minRequiredResults;

        if (shouldAutoLoad) {
            fetchNextPage();
        }
    }, [filteredUsers.length, hasNextPage, isFetchNextPage, localPageSize, fetchNextPage])

    // Reset strony przy zmianie wyszukiwania
    useEffect(() => {
        setLocalCurrentPage(1)
    }, [debouncedSearch])

    // Local sorting
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

    // Automatyczne resetowanie strony gdy aktualna strona jest większa niż dostępne strony
    useEffect(() => {
        if (localCurrentPage > totalLocalPages && totalLocalPages > 0) {
            setLocalCurrentPage(totalLocalPages)
        }
    }, [localCurrentPage, totalLocalPages])

    // Automatyczne ładowanie gdy zbliżamy się do końca dostępnych wyników
    const handlePageChange = (newPage) => {
        setLocalCurrentPage(newPage)

        // Sprawdź czy zbliżamy się do końca i czy trzeba załadować więcej
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


    if (!userPage.length && isLoading) {
        return (
            <div className={"animate-l1"}>
                <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
            </div>
        )
    }

    if (!userPage.length) {
        return <div>No users to show</div>
    }

    return (
        <div className={"flex flex-col text-center gap-2"}>
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
                                <button onClick={() => handleDelete(user.nick)} className={"btn-shine"}><Trash2/>
                                </button>
                            </td>
                            <td className={"border-2 border-dashed border-collapse p-2"}>
                                <button onClick={() => handleEditClick(user)} className={"btn-shine"}><Pencil/>
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

            {showEditForm && editingUser && (
                <EditUserForm user={editingUser} token={token} onSuccess={handleEditSuccess}
                              onClose={handleCloseEditForm}/>
            )}

        </div>
    )
}