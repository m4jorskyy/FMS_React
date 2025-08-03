//Roster.jsx

import PlayerCard from "../components/PlayerCard.jsx";
import useRoster from "../hooks/useRoster.js";

export default function Roster() {

    const {players, error, loading} = useRoster()

    const starters = players.filter(p => p.team_role === 'Player' || p.team_role === 'Captain')
    const coaches = players.filter(p => p.team_role === 'Coach')
    const subs = players.filter(p => p.team_role === 'Sub')

    return (
        <div className="roster">
            <img
                src={"/src/assets/logo.png"}
                alt={"logo"}
                style={{
                    height: "100px",
                    width: "100px",
                }}
            />

            {starters.length ? (
                <div>
                    <h2>Starters</h2>
                    <div className="starters">
                        {starters.map(starter => (
                            <PlayerCard key={starter.id} name={starter.first_name} surname={starter.last_name}
                                        nick={starter.nick}
                                        teamRole={starter.team_role} champion={starter.champion} lane={starter.lane
                            }/>
                        ))}
                    </div>
                </div>
            ) : null}

            {coaches.length ? (
                <div>
                    <h2>Coaches</h2>
                    <div className="coaches">
                        {coaches.map(coach => (
                            <PlayerCard key={coach.id} name={coach.first_name} surname={coach.last_name}
                                        nick={coach.nick}
                                        teamRole={coach.team_role} champion={coach.champion} lane={coach.lane}/>
                        ))}
                    </div>
                </div>
            ) : null}

            {subs.length ? (
                <div>
                    <h2>Subs</h2>
                    <div className="subs">
                        <br/>
                        {subs.map(sub => (
                            <PlayerCard key={sub.id} name={sub.first_name} surname={sub.last_name} nick={sub.nick}
                                        teamRole={sub.team_role} champion={sub.champion} lane={sub.lane}/>
                        ))}
                    </div>
                </div>
            ) : null}


        </div>
    );
}