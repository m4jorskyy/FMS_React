//Roster.jsx

import PlayerCard from "../components/PlayerCard.jsx";
import useRoster from "../hooks/useRoster.js";
import Alert from "../components/Alert.jsx";

export default function Roster() {

    const {players, error, loading} = useRoster()

    const starters = players.filter(p => p.team_role === 'Player' || p.team_role === 'Captain')
    const coaches = players.filter(p => p.team_role === 'Coach')
    const subs = players.filter(p => p.team_role === 'Sub')

    return (
        <div className={"flex flex-col items-center w-full min-h-screen scrollbar-hide mb-4 z-0"}>
            {loading ? (
                <div className={"animate-l1"}>
                    <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                </div>
            ) : null}

            {error !== null ? (
                <Alert type={"error"} message={error}/>
            ) : null}

            <div className="w-full px-4">
                {starters.length ? (
                    <div className={"flex flex-col items-center"}>
                        <h1 className={"text-[48px]"}>Starters</h1>
                        <br/>
                        <div className={"flex flex-row gap-2 overflow-x-scroll w-full items-start scrollbar-hide"}>
                            {starters.map(starter => (
                                <PlayerCard key={starter.id} name={starter.first_name} surname={starter.last_name}
                                            nick={starter.nick}
                                            champion={starter.champion} lane={starter.lane}
                                            instagram={starter.instagram} kick={starter.kick} tiktok={starter.tiktok}
                                            twitch={starter.twitch} twitter={starter.twitter} youtube={starter.youtube}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}

                <br/>

                {coaches.length ? (
                    <div className={"flex flex-col items-center"}>
                        <h1 className={"text-[48px]"}>Coaches</h1>
                        <br/>
                        <div className={"flex flex-row gap-2 overflow-x-scroll w-full items-start scrollbar-hide"}>
                            {coaches.map(coach => (
                                <PlayerCard key={coach.id} name={coach.first_name} surname={coach.last_name}
                                            nick={coach.nick}
                                            champion={coach.champion} lane={coach.lane}
                                            instagram={coach.instagram} kick={coach.kick} tiktok={coach.tiktok}
                                            twitch={coach.twitch} twitter={coach.twitter} youtube={coach.youtube}/>
                            ))}
                        </div>
                    </div>
                ) : null}

                <br/>

                {subs.length ? (
                    <div className={"flex flex-col items-center"}>
                        <h1 className={"text-[48px]"}>Subs</h1>
                        <br/>
                        <div className={"flex flex-row gap-2 overflow-x-scroll w-full items-start scrollbar-hide"}>
                            {subs.map(sub => (
                                <PlayerCard key={sub.id} name={sub.first_name} surname={sub.last_name} nick={sub.nick}
                                            champion={sub.champion} lane={sub.lane} instagram={sub.instagram} kick={sub.kick} twitter={sub.twitter}
                                            youtube={sub.youtube} tiktok={sub.tiktok} twitch={sub.twitch}/>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}