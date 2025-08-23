//PlayerCard.jsx

import useSoloqMatches from "../hooks/useSoloqMatches.js";
import SoloqMatchCard from "./SoloqMatchCard.jsx";
import useRanks from "../hooks/useRanks.js";
import RankBar from "./RankBar.jsx";

export default function PlayerCard({
                                       name,
                                       surname,
                                       nick,
                                       lane,
                                       champion,
                                       twitter,
                                       youtube,
                                       twitch,
                                       kick,
                                       instagram,
                                       tiktok
                                   }) {
    function capitalize(val) {
        return String(val).charAt(0) + String(val).slice(1).toLowerCase();
    }

    const ddVersion = '15.16.1'
    const champImgUrl = `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${champion}.png`

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useSoloqMatches(nick)

    const {data: rankData, isLoading: isLoadingRanks} = useRanks(nick)

    const rankDataFlat = Array.isArray(rankData) ? rankData : []

    const rankWings = (!isLoadingRanks && rankDataFlat[0] !== undefined) ? `/rankWings/${capitalize(rankDataFlat[0]['tier'])}.png` : null

    const laneIconSrc = `/laneIcons/${lane}.png`
    const matchList = data?.pages.flatMap(page => page.results) || []

    return (
        <div className={"flex flex-col items-center border-2 rounded-lg p-4 w-[350px]"}>
            <>
                <h3>{name} "{nick}" {surname}</h3>
                <img src={laneIconSrc} alt={lane} className={"w-7 h-7"}/>
                <br/>
                <div className={"grid place-items-center scale-120 -mt-10 -mb-5"}>
                    <img
                        src={`/teamPhotos/${nick}.jpg`}
                        alt={nick}
                        className={"w-27 h-27 rounded-[50%] object-cover col-start-1 row-start-1"}
                    />
                    {rankWings !== null ? (
                        <img src={rankWings} alt={"rankWings"}
                             className={"relative col-start-1 row-start-1 -top-10"}/>
                    ) : null}
                </div>
                <div className={"flex flex-col"}>
                    {rankDataFlat.map(summoner => (
                        <RankBar key={summoner.riot_id} rank={summoner.rank} tier={summoner.tier}
                                 riotId={summoner.riot_id} leaguePoints={summoner.league_points}/>
                    ))}
                </div>
                <div className={"flex flex-row gap-2 my-6"}>

                    {twitter && (
                        <a href={twitter} target="_blank" rel="noopener noreferrer">
                            <img src="/socialsIcons/Twitter.svg" alt="Twitter" className="w-6 h-6"/>
                        </a>
                    )}

                    {youtube && (
                        <a href={youtube} target="_blank" rel="noopener noreferrer">
                            <img src="/socialsIcons/Youtube.svg" alt="YouTube" className="w-6 h-6"/>
                        </a>
                    )}

                    {twitch && (
                        <a href={twitch} target="_blank" rel="noopener noreferrer">
                            <img src="/socialsIcons/Twitch.svg" alt="Twitch" className="w-6 h-6"/>
                        </a>
                    )}

                    {kick && (
                        <a href={kick} target="_blank" rel="noopener noreferrer">
                            <img src="/socialsIcons/Kick.svg" alt="Kick" className="w-6 h-6"/>
                        </a>
                    )}

                    {instagram && (
                        <a href={instagram} target="_blank" rel="noopener noreferrer">
                            <img src="/socialsIcons/Instagram.svg" alt="Instagram" className="w-6 h-6"/>
                        </a>
                    )}

                    {tiktok && (
                        <a href={tiktok} target="_blank" rel="noopener noreferrer">
                            <img src="/socialsIcons/Tiktok.svg" alt="TikTok" className="w-6 h-6"/>
                        </a>
                    )}


                </div>
                Favourite:
                <img
                    src={champImgUrl}
                    alt={champion}
                />
            </>
            <br/>

            {matchList.length !== 0 ? (
                <>
                    <p>Recent matches</p>
                    {matchList.map(match => (
                        <SoloqMatchCard key={match.match.match_id} lane={match.lane} assists={match.assists}
                                        deaths={match.deaths}
                                        game_duration={match.match.game_duration} game_start={match.match.game_start}
                                        kills={match.kills} summoner={match.summoner} win={match.win.toString()}
                                        champion={match.champion}/>
                    ))}
                </>
            ) : null}

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className={"btn-shine mt-4"}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </button>
            )}

        </div>
    )
}