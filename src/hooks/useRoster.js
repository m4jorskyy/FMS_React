//useRoster.js

import {useState, useMemo, useCallback} from 'react'
import players from "../data/players.js";

function useRoster() {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchTerm = useCallback((e) => {
        setSearchTerm(e.target.value)
    }, [])

    const filteredPlayers = useMemo(() =>
            players.filter(player => player.nick.toLowerCase().includes(searchTerm)),
        [searchTerm, setSearchTerm]
    )

    const starters = filteredPlayers.filter((player) => player.teamRole !== 'Coach' && player.teamRole !== 'Sub')

    const coaches = filteredPlayers.filter((player) => player.teamRole === 'Coach')

    const subs = filteredPlayers.filter((player) => player.teamRole === 'Sub')

    return {
        searchTerm, handleSearchTerm, starters, coaches, subs
    }
}

export default useRoster;