//OfficialMatchCard.jsx

export default function OfficialMatchCard({opponents, beginAt, status, results, games, leagueName, tournamentName}) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            border: '1px solid #ccc',
            padding: '1rem',
            margin: '0.5rem 0',
            backgroundColor: 'black',
            color: 'white',
            width: '90%'
        }}>
            <div className="match-opponents">
                {opponents.map(team => (
                    <div key={team.id} className="team">
                        <img src={team.image_url} alt={team.acronym}/>
                        <span>{team.acronym}</span>
                    </div>
                ))}
            </div>
            <ul className="match-results">
                {results.map(r => (
                    <li key={r.team_id}>
                        {r.score} {r.team_id === opponents[0].id ? opponents[0].acronym : opponents[1].acronym}
                    </li>
                ))}
            </ul>
            <div className="match-games">
                {games.map(g => (
                    <div key={g.position}>
                        Game {g.position}: {Math.floor(g.length / 60)}m {g.length % 60}s, winner: {g.winnerId}
                    </div>
                ))}
            </div>

        </div>
    )
}