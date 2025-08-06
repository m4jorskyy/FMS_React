//SoloqMatchCard.jsx

export default function SoloqMatchCard({game_start, game_duration, summoner, kills, deaths, assists, lane, win, champion}){
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

            <p>{game_start}, {game_duration}</p>
            <p>{summoner}: {kills}/{deaths}/{assists}, {champion}, {lane}, {win}</p>
        </div>
    )
}