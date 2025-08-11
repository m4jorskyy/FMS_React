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
        <div>
            <div>
                <h3>{name} "{nick}" {surname}</h3>
                <p>{lane}</p>
                <img
                    src={`/src/assets/teamPhotos/${nick}.jpg`}
                    alt={nick}
                />
                <p>
                    Main:
                    <br/>
                    <img
                        src={champImgUrl}
                        alt={champion}
                    />
                </p>

                {teamRole === "Captain" && <p>owner</p>}
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