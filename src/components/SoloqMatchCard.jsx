//SoloqMatchCard.jsx

export default function SoloqMatchCard({game_start, game_duration, summoner, kills, deaths, assists, lane, win, champion}){
    return (
        <div>
            <p>{game_start}, {game_duration}</p>
            <p>{summoner}: {kills}/{deaths}/{assists}, {champion}, {lane}, {win}</p>
        </div>
    )
}