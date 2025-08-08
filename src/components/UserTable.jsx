import {useEffect, useMemo, useState} from "react";
import {debounce} from 'lodash';
import useDeleteUser from "../hooks/useDeleteUser.js";
import EditUserForm from "./EditUserForm.jsx";

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
        return <div>Ładowanie użytkowników...</div>
    }

    if (!userPage.length) {
        return <div>Brak użytkowników do wyświetlenia</div>
    }

    return (
        <div style={{
            border: '2px solid red'
        }}>
            <h1>Lista użytkowników</h1>
            <div>
                <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Szukaj użytkowników"
                />
            </div>

            <table>
                <thead>
                <tr>
                    <th
                        onClick={() => setSorting([{
                            id: 'first_name',
                            desc: sorting[0]?.id === 'first_name' ? !sorting[0]?.desc : false
                        }])}
                        style={{cursor: 'pointer'}}
                    >
                        Imię {sorting[0]?.id === 'first_name' && (sorting[0]?.desc ? '↓' : '↑')}
                    </th>
                    <th
                        onClick={() => setSorting([{
                            id: 'last_name',
                            desc: sorting[0]?.id === 'last_name' ? !sorting[0]?.desc : false
                        }])}
                        style={{cursor: 'pointer'}}
                    >
                        Nazwisko {sorting[0]?.id === 'last_name' && (sorting[0]?.desc ? '↓' : '↑')}
                    </th>
                    <th
                        onClick={() => setSorting([{
                            id: 'nick',
                            desc: sorting[0]?.id === 'nick' ? !sorting[0]?.desc : false
                        }])}
                        style={{cursor: 'pointer'}}
                    >
                        Nick {sorting[0]?.id === 'nick' && (sorting[0]?.desc ? '↓' : '↑')}
                    </th>
                    <th
                        onClick={() => setSorting([{
                            id: 'email',
                            desc: sorting[0]?.id === 'email' ? !sorting[0]?.desc : false
                        }])}
                        style={{cursor: 'pointer'}}
                    >
                        Email {sorting[0]?.id === 'email' && (sorting[0]?.desc ? '↓' : '↑')}
                    </th>
                    <th
                        onClick={() => setSorting([{
                            id: 'role',
                            desc: sorting[0]?.id === 'role' ? !sorting[0]?.desc : false
                        }])}
                        style={{cursor: 'pointer'}}
                    >
                        Role {sorting[0]?.id === 'role' && (sorting[0]?.desc ? '↓' : '↑')}
                    </th>
                    <th>
                        USUŃ
                    </th>
                    <th>
                        EDYTUJ
                    </th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers.map((user, index) => (
                    <tr key={user.id || index}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.nick}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => handleDelete(user.nick)}>🗑️</button>
                        </td>
                        <td>
                            <button onClick={() => handleEditClick(user)}>✏️</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div>
                <button
                    onClick={() => handlePageChange(Math.max(1, localCurrentPage - 1))}
                    disabled={localCurrentPage === 1}
                >
                    Poprzednia strona
                </button>

                <span>Strona {localCurrentPage} z {totalLocalPages}</span>

                <button
                    onClick={() => handlePageChange(Math.min(totalLocalPages, localCurrentPage + 1))}
                    disabled={localCurrentPage === totalLocalPages}
                >
                    Następna strona
                </button>
            </div>

            {showEditForm && editingUser && (
                <EditUserForm user={editingUser} token={token} onSuccess={handleEditSuccess} onClose={handleCloseEditForm}/>
            )}

        </div>
    )
}