//Stats.jsx

import useOfficialStatsOptions from "../hooks/useOfficialStatsOptions.js";
import useRoster from "../hooks/useRoster.js";
import {useState} from "react";
import useOfficialStats from "../hooks/useOfficialStats.js";
import OfficialStatsPlayer from "../components/OfficialStatsPlayer.jsx";
import OfficialStatsMatches from "../components/OfficialStatsMatches.jsx";

export default function Stats() {
    const {players, errorPlayer, loadingPlayer} = useRoster()
    const [player, setPlayer] = useState('')
    const [year, setYear] = useState('')
    const [champion, setChampion] = useState('')
    const [tournament, setTournament] = useState('')
    const [teamVs, setTeamVs] = useState('')

    const starters = players.filter(p => p.team_role === 'Player' || p.team_role === 'Captain')
    const filteredStarter = starters.find(p => p.nick === player) || []

    const {
        data: options
    } = useOfficialStatsOptions(player, {
        enabled: player !== ''
    })

    const {
        data: stats_matches,
        fetchNextPage,
        isFetchingNextPage
    } = useOfficialStats(player, champion, year, tournament, teamVs, {
        enabled: player !== ''
    })

    const stats = stats_matches?.pages?.[0]?.aggregated_stats || []
    const matches = stats_matches?.pages?.flatMap(page => page.matches?.results || []) || []

    const handleYearChange = (e) => {
        const value = e.target.value
        setYear(value)
    }

    const handleChampionChnage = (e) => {
        const value = e.target.value
        setChampion(value)
    }

    const handleTournamentChange = (e) => {
        const value = e.target.value
        setTournament(value)
    }

    const handleTeamVsChange = (e) => {
        const value = e.target.value
        setTeamVs(value)
    }

    return (
        <div className={"flex flex-col w-[95vw]"}>
            <div className={"flex flex-row gap-2 items-center justify-center mb-2 text-center"}>
                {starters.map(s => (
                    <div key={s.nick} onClick={() => setPlayer(s.nick)} className={"cursor-pointer"}>{s.nick}</div>
                ))}
            </div>
            {player !== '' ? (
                <OfficialStatsPlayer nick={filteredStarter.nick} lane={filteredStarter.lane}
                                     lastName={filteredStarter.last_name} firstName={filteredStarter.first_name}
                                     avgCsPerMin={stats.avg_cs_per_min} avgDmgPerMin={stats.avg_damage_per_min}
                                     avgDmgParticipation={stats.avg_dmg_participation}
                                     avgGoldParticipation={stats.avg_gold_participation} avgKDA={stats.avg_kda}
                                     avgKillParticipation={stats.avg_kill_participation}
                                     avgVisionScore={stats.avg_vision_score} totalMatches={stats.total_matches}
                                     winRate={stats.win_rate}/>
            ) : null}

            {player !== '' ? (
                <div className={"flex flex-col gap-3 w-[95vw] text-center"}>
                    <h2 className={"mt-2"}>Match History</h2>
                    {matches.map(m => (
                        <OfficialStatsMatches key={m.id} champion={m.champion} role={m.role} kills={m.kills}
                                              deaths={m.deaths} assists={m.assists} cs={m.cs}
                                              damage={m.damage_to_champions}
                                              datetime={m.datetime_utc} gamelength={m.gamelength} items={m.items}
                                              patch={m.patch} primaryTree={m.primaryTree} runes={m.runes}
                                              secondaryTree={m.secondaryTree} side={m.side}
                                              teamVs={m.team_vs}
                                              tournament={m.tournament}
                                              visionScore={m.vision_score} winner={m.winner} csPerMin={m.cs_per_min} dmgPerMin={m.damage_per_min} dmgParticipation={m.dmg_participation} goldParticipation={m.gold_participation} kda={m.kda} killParticipation={m.kill_participation}/>
                    ))}

                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className={"btn-shine my-4"}
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load more'}
                    </button>

                </div>
            ) : null}
        </div>
    )
}