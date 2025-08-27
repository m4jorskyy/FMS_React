//OfficialStatsMatches.jsx

import {Target, Wheat, Sword, Swords, Trophy, Calendar, HandCoins, Eye, Crosshair, Timer} from "lucide-react";
import {useState} from "react";
import ITEMS from "/src/data/items.js"
import RUNES from "/src/data/runes.js"
import moment from "moment";

export default function OfficialStatsMatches({
                                                 tournament,
                                                 datetime,
                                                 patch,
                                                 gamelength,
                                                 winner,
                                                 side,
                                                 teamVs,
                                                 role,
                                                 champion,
                                                 kills,
                                                 deaths,
                                                 assists,
                                                 cs,
                                                 visionScore,
                                                 items,
                                                 primaryTree,
                                                 secondaryTree,
                                                 runes,
                                                 kda,
                                                 csPerMin,
                                                 dmgPerMin,
                                                 killParticipation,
                                                 goldParticipation,
                                                 dmgParticipation
                                             }) {
    function capitalize(val) {
        return String(val).charAt(0) + String(val).slice(1).toLowerCase();
    }

    const [open, setOpen] = useState(false)

    champion = capitalize(champion.replace("'", ""))

    if (champion === "Wukong") {
        champion = "MonkeyKing"
    }

    if (champion === "Ksante"){
        champion = "KSante"
    }

    switch (role) {
        case 'Mid':
            role = 'Middle'
            break

        case 'Bot':
            role = 'Bottom'
            break

        case 'Support':
            role = 'Utility'
            break
    }

    const primary = runes.slice(0, 4)
    const secondary = runes.slice(4, 6)
    const shards = runes.slice(6)

    const ddVersion = '15.16.1'
    const champImgUrl = `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${champion}.png`

    const roleIconSrc = `/laneIcons/${role}.png`
    const cardStyle = {
        backgroundColor: winner === side ? "#f6223d" : "#2e2e2e", color: winner === side ? "#140000" : "#f6223d"
    }

    return (
        <div className={"flex flex-col rounded-lg cursor-pointer text-center"} style={cardStyle}
             onClick={() => setOpen(!open)}>
            <div className={"flex flex-row justify-between p-3"}>
                <div>
                    <img
                        src={champImgUrl}
                        alt={champion}
                        className={"w-15 h-15 z-1"}
                    />
                    {role ? (<img
                        src={roleIconSrc}
                        alt={role}
                        className={"relative w-6 h-6 z-10 -top-6.5 left-8.5 border-2 border-[#140000] rounded-lg"}
                    />) : <br/>}
                </div>
                <p>{kills}/{deaths}/{assists}</p>
                <p>{teamVs.split(/[\(\[\{]/)[0].trim()}</p>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-190 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className={`flex flex-col ${open ? "" : "hidden"} `}>
                    <p>{tournament}</p>
                    <p>{moment(datetime).format("DD-MM-YYYY HH:mm")}</p>
                    <hr className={"my-4"}/>
                    <p>STATS</p>
                    <div className={`grid grid-cols-3 grid-rows-3 gap-3 p-3`}>
                        <div className={`official-stat border-2`} style={cardStyle}>
                            <div className={"flex flex-row justify-center gap-1"}>
                                <Target/>
                                <p>KDA</p>
                            </div>
                            <p>{kda}</p>
                        </div>
                        <div className={`official-stat border-2`} style={cardStyle}>
                            <div className={"flex flex-row justify-center gap-1"}>
                                <Wheat/>
                                <p>CSPM</p>
                            </div>
                            <p>{csPerMin}</p>
                        </div>
                        <div className={`official-stat border-2`} style={cardStyle}>
                            <div className={"flex flex-row justify-center gap-1"}>
                                <Sword/>
                                <p>DPM</p>
                            </div>
                            <p>{dmgPerMin}</p>
                        </div>
                        <div className={`official-stat border-2`} style={cardStyle}>
                            <div className={"flex flex-row justify-center gap-1"}>
                                <Timer/>
                                <p>Length</p>
                            </div>
                            <p>{gamelength}</p>
                        </div>
                        <div className={`official-stat border-2`} style={cardStyle}>
                            <div className={"flex flex-row justify-center gap-1"}>
                                <HandCoins/>
                                <p>GP%</p>
                            </div>
                            <p>{goldParticipation}%</p>
                        </div>
                        <div className={`official-stat border-2`} style={cardStyle}>
                            <div className={"flex flex-row justify-center gap-1"}>
                                <Swords/>
                                <p>DMG%</p>
                            </div>
                            <p>{dmgParticipation}%</p>
                        </div>
                        <div className={`official-stat border-2`} style={cardStyle}>
                            <div className={"flex flex-row justify-center gap-1"}>
                                <Swords/>
                                <p>CS</p>
                            </div>
                            <p>{cs}</p>
                        </div>
                        <div className={`official-stat border-2`} style={cardStyle}>
                            <div className={"flex flex-row justify-center gap-1"}>
                                <Eye/>
                                <p>VS</p>
                            </div>
                            <p>{visionScore}</p>
                        </div>
                        <div className={`official-stat border-2`} style={cardStyle}>
                            <div className={"flex flex-row justify-center gap-1"}>
                                <Swords/>
                                <p>KP%</p>
                            </div>
                            <p>{killParticipation}%</p>
                        </div>
                    </div>
                    <hr className={"my-4"}/>
                    <p>RUNES</p>
                    <div className={"flex flex-row justify-center"}>
                        <div className={"flex flex-col"}>
                            {primary.map((r, index) => (
                                <img key={index} src={RUNES[r]} alt={r} className={"w-12 h-12 border-2 rounded-[50%]"}/>
                            ))}
                        </div>
                        <div className={"flex flex-col"}>
                            {secondary.map((r, index) => (
                                <img key={index} src={RUNES[r]} alt={r} className={"w-12 h-12 border-2 rounded-[50%]"}/>
                            ))}
                        </div>
                        <div className={"flex flex-col"}>
                            {shards.map((r, index) => (
                                <img key={index} src={RUNES[r]} alt={r} className={"w-12 h-12 border-2 rounded-[50%]"}/>
                            ))}
                        </div>
                    </div>
                    <hr className={"my-4"}/>
                    <div className={"flex flex-col gap-3 mb-3"}>
                        <p>BUILD</p>
                        <div className={"flex flex-row items-center justify-center"}>
                            {items.map((item, index) => {
                                const id = ITEMS[item];
                                if (!id) return null;

                                return (
                                    <img
                                        key={index}
                                        src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/item/${id}.png`}
                                        alt={item}
                                        className="w-10 h-10 border-2 rounded-sm mr-2"
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
