//SoloqMatchCard.jsx
import moment from 'moment'

export default function SoloqMatchCard({
                                           game_start,
                                           game_duration,
                                           summoner,
                                           kills,
                                           deaths,
                                           assists,
                                           lane,
                                           win,
                                           champion
                                       }) {
    const ddVersion = '15.14.1'
    const champImgUrl = `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${champion}.png`

    const firstLetter = lane.charAt(0)
    const remaining = lane.slice(1).toLowerCase()

    lane = firstLetter + remaining

    const laneIconSrc = `/laneIcons/${lane}.png`
    const cardStyle = {
        backgroundColor: win === "true" ? "#f6223d" : "#2e2e2e", color: win === "true" ? "#2e2e2e" : "#f6223d"
    }

    return (
        <div className={"flex flex-row justify-between rounded-lg p-2 mt-2 w-[280px]"} style={cardStyle}>
            <div className={"flex flex-col items-center justify-center"}>
                <p>{moment(game_start).fromNow()}</p>
                <br/>
                <p>{moment.duration(game_duration, "seconds").minutes()}m {moment.duration(game_duration, "seconds").seconds()}s</p>
            </div>
            <div className={"flex flex-col items-center"}>
                <div>
                    <img
                        src={champImgUrl}
                        alt={champion}
                        className={"w-15 h-15 z-1"}
                    />
                    {lane ? (<img
                            src={laneIconSrc}
                            alt={lane}
                            className={"relative w-6 h-6 z-10 -top-6.5 left-8.5 border-2 border-[#140000] rounded-lg"}
                        />) : <br/>}
                </div>

                <p>{summoner}</p>
                <p>{kills}/{deaths}/{assists}</p>
            </div>
        </div>)
}