//PlayerCard.jsx

import useSoloqMatches from "../hooks/useSoloqMatches.js";
import SoloqMatchCard from "./SoloqMatchCard.jsx";


export default function PlayerCard({name, surname, nick, lane, champion, teamRole}) {
    const ddVersion = '15.14.1'
    const champImgUrl = `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${champion}.png`

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useSoloqMatches(nick)

    const laneIconSrc = `/src/assets/laneIcons/${lane}.png`
    const matchList = data?.pages.flatMap(page => page.results) || []


    return (
        <div className={"flex flex-col items-center border-2 rounded-lg p-4 min-w-[300px] max-w-[340px]"}>
            <>
                <h3>{name} "{nick}" {surname}</h3>
                <img src={laneIconSrc} alt={lane} className={"w-8 h-7"}/>
                <br/>
                <img
                    src={`/src/assets/teamPhotos/${nick}.jpg`}
                    alt={nick}
                    className={"w-50 h-50 rounded-[50%] object-cover"}
                />
                <br/>

                Main:
                <img
                    src={champImgUrl}
                    alt={champion}
                />
                {teamRole === "Captain" && <p className={"text-[#ffd700]"}>owner</p>}
            </>
            <br />
            <p>Recent matches</p>
                {matchList.map(match => (
                    <SoloqMatchCard key={match.match.match_id} lane={match.lane} assists={match.assists}
                                    deaths={match.deaths}
                                    game_duration={match.match.game_duration} game_start={match.match.game_start}
                                    kills={match.kills} summoner={match.summoner} win={match.win.toString()}
                                    champion={match.champion}/>
                ))}

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </button>
            )}

        </div>
    )
}