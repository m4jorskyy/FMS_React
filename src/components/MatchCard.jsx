//MatchCard.jsx

export default function MatchCard({game_start, game_duration, summoner, kills, deaths, assists, lane, win}){
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
            <p>{summoner}: {kills}/{deaths}/{assists}, {lane}, {win}</p>
        </div>
    )
}