import {useEffect, useMemo, useState} from "react";
import {debounce} from 'lodash';
import useDeleteUser from "../hooks/useDeleteUser.js";

export default function UserTable({users}) {
    // Memoize user data to prevent unnecessary re-renders
    const userPage = useMemo(() => {
        return users?.pages?.flatMap(page => page.results) || []
    }, [users?.pages])

    const [sorting, setSorting] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

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

    // Local filtering (faster than TanStack Table)
    const filteredUsers = useMemo(() => {
        if (!debouncedSearch.trim()) return userPage

        const search = debouncedSearch.toLowerCase()
        return userPage.filter(user =>
            user.first_name?.toLowerCase().includes(search) ||
            user.last_name?.toLowerCase().includes(search)
        )
    }, [userPage, debouncedSearch])

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

    // Local pagination
    const [currentPage, setCurrentPage] = useState(0)
    const pageSize = 5
    const paginatedUsers = useMemo(() => {
        const start = currentPage * pageSize
        return sortedAndFilteredUsers.slice(start, start + pageSize)
    }, [sortedAndFilteredUsers, currentPage])

    const totalPages = Math.ceil(sortedAndFilteredUsers.length / pageSize)

    const {error, success, loading, handleDelete} = useDeleteUser()

    // Reset page when filtering
    useEffect(() => {
        setCurrentPage(0)
    }, [debouncedSearch])

    if (!userPage.length) {
        return <div>Brak użytkowników do wyświetlenia</div>
    }

    return (
        <div>
            <h1>Lista użytkowników</h1>
            <div>
                <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Szukaj użytkowników"
                />
                <div>
                    Pokazuję {sortedAndFilteredUsers.length} z {userPage.length} użytkowników
                </div>
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
                        <td><button onClick={() => handleDelete(user.nick)}></button></td>
                        <td><button></button></td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div>
                <button
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                >
                    Poprzednia
                </button>
                <span> Strona {currentPage + 1} z {totalPages} </span>
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={currentPage >= totalPages - 1}
                >
                    Następna
                </button>
            </div>
        </div>
    )
}