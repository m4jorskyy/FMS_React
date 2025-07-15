export default function PlayerCard({name, surname, nick, lane, champion, teamRole}) {
    const ddVersion = '15.12.1'
    const champImgUrl = `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${champion}.png`

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
                <br />
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