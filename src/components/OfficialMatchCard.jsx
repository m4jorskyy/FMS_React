//OfficialMatchCard.jsx
import moment from 'moment'
import {useState} from "react";

export default function OfficialMatchCard({opponents, beginAt, status, results, games, leagueName, tournamentName}) {
    const fmsId = 136773
    const opp = opponents.find(team => team.id !== fmsId)
    const orderedResults = results.sort((a, b) => {
        if (a.team_id === fmsId) return -1
        if (b.team_id === fmsId) return 1;
        return 0;
    })

    const [open, setOpen] = useState(false)

    console.log(leagueName, tournamentName)

    return (
        <div className={"border-2 rounded-lg p-4 m-4 cursor-pointer w-[90vw]"} onClick={() => setOpen(!open)}>
            <div className={"flex flex-row justify-between gap-2"}>
                <div className={"flex flex-col items-center"}>
                    <img src={"/src/assets/logo.png"} alt={"FMS"} className={"w-16 h-16"}/>
                    <p>FMS</p>
                </div>
                <span className={"text-center text-[40px]"}>
                    {orderedResults[0].score} : {orderedResults[1].score}
                </span>
                <div className={"flex flex-col items-center"}>
                    <img src={opp.image_url} alt={opp.acronym} className={"w-16 h-16"}/>
                    <p>{opp.acronym}</p>
                </div>
            </div>
            <div>
                <table className={`border-2 border-dashed border-collapse text-center ${open ? null : "hidden"}`}>
                    <tbody>
                    <tr>
                        <td className={"p-2 border-2 border-dashed"}>
                            GAME
                        </td>
                        {games.map(g => (
                            <td key={g.position} className={"border-2 border-dashed p-2"}>{g.position}</td>
                        ))}
                    </tr>
                    <tr>
                        <td className={"p-2"}>WINNER</td>
                        {games.map(g => (
                            <td key={g.position} className={"border-2 border-dashed p-2"}>{g.winnerId === fmsId ?
                                <div className={"flex justify-center items-center"}>
                                    <img src={"/src/assets/logo.png"} alt={"FMS"} className={"w-6 h-6"}/>
                                </div>
                                : g.winnerId === null ? null : <div className={"flex justify-center items-center"}>
                                    <img src={opp.image_url} alt={opp.acronym} className={"w-6 h-6"}/>
                                </div>}</td>
                        ))}
                    </tr>
                    <tr>
                        <td className={"border-dashed border-2 p-2"}>TIME</td>
                        {games.map(g => (
                            <td key={g.position}
                                className={"border-dashed border-2 p-2"}>{moment.duration(g.length, "seconds").minutes()}m {moment.duration(g.length, "seconds").seconds()}s</td>
                        ))}
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}