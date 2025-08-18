//PlayerCard.jsx

import useSoloqMatches from "../hooks/useSoloqMatches.js";
import SoloqMatchCard from "./SoloqMatchCard.jsx";

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

    const laneIconSrc = `/laneIcons/${lane}.png`
    const matchList = data?.pages.flatMap(page => page.results) || []

    return (
        <div className={"flex flex-col items-center border-2 rounded-lg p-4 min-w-[300px]"}>
            <>
                <h3>{name} "{nick}" {surname}</h3>
                <img src={laneIconSrc} alt={lane} className={"w-7 h-7"}/>
                <br/>
                <img
                    src={`/teamPhotos/${nick}.jpg`}
                    alt={nick}
                    className={"w-50 h-50 rounded-[50%] object-cover"}
                />
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
                Main:
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