//Roster.jsx

import players from "../data/players.js";
import PlayerCard from "../components/PlayerCard.jsx";

export default function Roster() {
    const starters = players.filter((player) => player.teamRole !== 'Coach' && player.teamRole !== 'Sub')
    const coaches = players.filter((player) => player.teamRole === 'Coach')
    const subs = players.filter((player) => player.teamRole === 'Sub')

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

            <h2>Starters</h2>
            <div className="starters">
                {starters.map(starter => (
                    <PlayerCard key={starter.id} name={starter.name} surname={starter.surname} nick={starter.nick} teamRole={starter.teamRole} champion={starter.champion} lane={starter.lane} />
                ))}
            </div>

            <h2>Coaches</h2>
            <div className="coaches">
                {coaches.map(coach => (
                    <PlayerCard key={coach.id} name={coach.name} surname={coach.surname} nick={coach.nick} teamRole={coach.teamRole} champion={coach.champion} lane={coach.lane} />
                ))}
            </div>

            <h2>Subs</h2>
            <div className="subs">
                {subs.map(sub => (
                    <PlayerCard key={sub.id} name={sub.name} surname={sub.surname} nick={sub.nick} teamRole={sub.teamRole} champion={sub.champion} lane={sub.lane} />
                ))}
            </div>



        </div>
    );
}