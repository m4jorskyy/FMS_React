//PlayerCard.jsx

import useSoloqMatches from "../hooks/useSoloqMatches.js";
import SoloqMatchCard from "./SoloqMatchCard.jsx";

export default function PlayerCard({name, surname, nick, lane, champion, teamRole}) {
    const ddVersion = '15.12.1'
    const champImgUrl = `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${champion}.png`

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useSoloqMatches(nick)

    const matchList = data?.pages.flatMap(page => page.results) || []

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            border: '1px solid #ccc',
            padding: '1rem',
            margin: '0.5rem 0',
            backgroundColor: roleColors[teamRole] || '#fff',
            color: roleTextColors[teamRole] || 'white',
            width: '90%',
        }}>
            <div>
                <h3>{name} "{nick}" {surname}</h3>
                <p style={{
                    marginTop: '-0.75rem',
                }}>{lane}</p>
                <img
                    src={`/src/assets/teamPhotos/${nick}.jpg`}
                    alt={nick}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }}
                />
                <p>
                    Main:
                    <br/>
                    <img
                        src={champImgUrl}
                        alt={champion}
                        style={{
                            height: '50px',
                            width: '50px'
                        }}
                    />
                </p>

                {teamRole === "Captain" && <p
                    style={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                    }}>owner</p>}
            </div>
            {matchList.map(match => (
                <SoloqMatchCard key={match.match.match_id} lane={match.lane} assists={match.assists} deaths={match.deaths}
                                game_duration={match.match.game_duration} game_start={match.match.game_start}
                                kills={match.kills} summoner={match.summoner} win={match.win} champion={match.champion}/>
            ))}

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Ładowanie…' : 'Pokaż więcej'}
                </button>
            )}

        </div>
    )
}

const roleColors = {
    Coach: '#999',
    Captain: 'gold',
    Player: '#222',
    Sub: '#222'
};

const roleTextColors = {
    Captain: 'black',
}