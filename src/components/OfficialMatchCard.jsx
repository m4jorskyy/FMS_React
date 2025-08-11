//OfficialMatchCard.jsx

export default function OfficialMatchCard({opponents, beginAt, status, results, games, leagueName, tournamentName}) {
    return (
        <div>
            <div>
                {opponents.map(team => (
                    <div key={team.id} >
                        <img src={team.image_url} alt={team.acronym}/>
                        <span>{team.acronym}</span>
                    </div>
                ))}
            </div>
            <ul>
                {results.map(r => (
                    <li key={r.team_id}>
                        {r.score} {r.team_id === opponents[0].id ? opponents[0].acronym : opponents[1].acronym}
                    </li>
                ))}
            </ul>
            <div>
                {games.map(g => (
                    <div key={g.position}>
                        Game {g.position}: {Math.floor(g.length / 60)}m {g.length % 60}s, winner: {g.winnerId}
                    </div>
                ))}
            </div>

        </div>
    )
}