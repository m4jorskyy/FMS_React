//RankBar.jsx

export default function RankBar({riotId, tier, rank, leaguePoints}) {
    if (tier === 'CHALLENGER' || tier === 'GRANDMASTER' || tier === 'MASTER') {
        rank = ''
    }

    function capitalize(val) {
        return String(val).charAt(0) + String(val).slice(1).toLowerCase();
    }

    return (
        <div className={"flex flex-col mb-5 text-center items-center"}>
            <img src={`/rankIcons/${capitalize(tier)}.png`} alt={tier} className={"w-20 h-20"}/>
            <p>{riotId}</p>
            <p>{tier} {rank} {leaguePoints} LP</p>
        </div>
    )
}

