//Roster.jsx

import PlayerCard from "../components/PlayerCard.jsx";
import useRoster from "../hooks/useRoster.js";

export default function Roster() {

    const {players, error, loading} = useRoster()

    const starters = players.filter(p => p.team_role === 'Player' || p.team_role === 'Captain')
    const coaches = players.filter(p => p.team_role === 'Coach')
    const subs = players.filter(p => p.team_role === 'Sub')

    return (
        <div className={"flex flex-col items-center w-screen h-screen overflow-y-auto mt-20 z-0"}>
            {loading ? (
                <div className={"animate-l1"}>
                    <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                </div>
            ) : null}

            <div className="w-full">
                {starters.length ? (
                    <div className={"flex flex-col items-center"}>
                        <h1>Starters</h1>
                        <br />
                        <div className={"flex flex-row gap-2 overflow-x-scroll w-full"}>
                            {starters.map(starter => (
                                <PlayerCard key={starter.id} name={starter.first_name} surname={starter.last_name}
                                            nick={starter.nick}
                                            teamRole={starter.team_role} champion={starter.champion} lane={starter.lane}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}

                <br/>

                {coaches.length ? (
                    <div>
                        <h2>Coaches</h2>
                        <br />
                        <div>
                            {coaches.map(coach => (
                                <PlayerCard key={coach.id} name={coach.first_name} surname={coach.last_name}
                                            nick={coach.nick}
                                            teamRole={coach.team_role} champion={coach.champion} lane={coach.lane}/>
                            ))}
                        </div>
                    </div>
                ) : null}

                <br/>

                {subs.length ? (
                    <div className={"flex flex-col items-center"}>
                        <h2>Subs</h2>
                        <br />
                        <div className={"flex flex-row gap-2 overflow-x-scroll w-full items-start"}>
                            {subs.map(sub => (
                                <PlayerCard key={sub.id} name={sub.first_name} surname={sub.last_name} nick={sub.nick}
                                            teamRole={sub.team_role} champion={sub.champion} lane={sub.lane}/>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}