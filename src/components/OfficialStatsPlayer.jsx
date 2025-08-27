//OfficialStatsPlayer.jsx

import {Target, Wheat, Sword, Swords, Trophy, Calendar, HandCoins, Eye, Crosshair} from 'lucide-react'

export default function OfficialStatsPlayer({
                                                avgKDA,
                                                avgCsPerMin,
                                                avgDmgPerMin,
                                                winRate,
                                                totalMatches,
                                                avgKillParticipation,
                                                avgGoldParticipation,
                                                avgDmgParticipation,
                                                avgVisionScore,
                                                firstName,
                                                lastName,
                                                nick,
                                                lane
                                            }) {
    return (
        <div className={"flex sm:flex-row flex-col border-2 rounded-lg p-3"}>
            <div className={"flex flex-col justify-center items-center gap-4 mb-3 sm:mr-3 text-center min-w-[250px]"}>
                <img src={`/teamPhotos/${nick}.jpg`} alt={nick} className={"w-25 h-25 rounded-lg border-2"}/>
                <p>{firstName} "{nick}" {lastName}</p>
                <img src={`/laneIcons/${lane}.png`} alt={lane} className={"w-7 h-7"}/>
            </div>

            <div className={"grid grid-cols-3 grid-rows-3 gap-3 w-full"}>
                <div className={"official-stat"}>
                    <div className={"flex flex-row justify-center gap-1"}>
                        <Target/>
                        <p>KDA</p>
                    </div>
                    <p>{avgKDA}</p>
                </div>
                <div className={"official-stat"}>
                    <div className={"flex flex-row justify-center gap-1"}>
                        <Wheat/>
                        <p>CSPM</p>
                    </div>
                    <p>{avgCsPerMin}</p>
                </div>
                <div className={"official-stat"}>
                    <div className={"flex flex-row justify-center gap-1"}>
                        <Sword/>
                        <p>DPM</p>
                    </div>
                    <p>{avgDmgPerMin}</p>
                </div>
                <div className={"official-stat"}>
                    <div className={"flex flex-row justify-center gap-1"}>
                        <Trophy/>
                        <p>WR%</p>
                    </div>
                    <p>{winRate}%</p>
                </div>
                <div className={"official-stat"}>
                    <div className={"flex flex-row justify-center gap-1"}>
                        <HandCoins/>
                        <p title={"How much gold of a team you have (in %)"}>GP%</p>
                    </div>
                    <p>{avgGoldParticipation}%</p>
                </div>
                <div className={"official-stat"}>
                    <div className={"flex flex-row justify-center gap-1"}>
                        <Swords/>
                        <p>DMG%</p>
                    </div>
                    <p>{avgDmgParticipation}%</p>
                </div>
                <div className={"official-stat"}>
                    <div className={"flex flex-row justify-center gap-1"}>
                        <Calendar/>
                        <p>Games</p>
                    </div>
                    <p>{totalMatches}</p>
                </div>
                <div className={"official-stat"}>
                    <div className={"flex flex-row justify-center gap-1"}>
                        <Eye/>
                        <p>VS</p>
                    </div>
                    <p>{avgVisionScore}</p>
                </div>
                <div className={"official-stat"}>
                    <div className={"flex flex-row justify-center gap-1"}>
                        <Crosshair/>
                        <p>KP%</p>
                    </div>
                    <p>{avgKillParticipation}%</p>
                </div>
            </div>
        </div>
    )
}