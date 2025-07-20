//Stats.jsx

import useSoloqMatches from '../hooks/useSoloqMatches.js'
import players from "../data/players.js";

export default function Stats() {

    const {
        matchesByPlayer,
        loading,
        error
    } = useSoloqMatches()

    const entries = matchesByPlayer ? Object.entries(matchesByPlayer) : []

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '1rem',
            margin: '0.5rem 0',
            color: '#fff',
            width: '90%',
        }}>
            {loading ? <p>Ładowanie...</p> : ""}
            {error !== '' ? error : ''}
            {entries.map(([playerId, matches]) => {
                const player = players.find(player => player.id === Number(playerId))

                return (
                    <div key={playerId} style={{marginBottom: '2rem'}}>
                        <h2>{player.nick}</h2>
                        <ul>
                            {matches.map(m => (
                                <li key={m.matchId}>
                                    {m.championName}: {m.kills}/{m.deaths}/{m.assists} – {m.win ? 'Win' : 'Loss'}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}