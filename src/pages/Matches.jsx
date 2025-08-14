//Matches.jsx

import useOfficialMatches from "../hooks/useOfficialMatches.js";
import OfficialMatchCard from "../components/OfficialMatchCard.jsx";

export default function Matches() {
    const teamId = 136773

    // w Matches.jsx
    const {
        data: upcomingData, isLoading: isLoadingUpcoming, isError: isErrorUpcoming,
    } = useOfficialMatches(teamId, 'not_started')

    const {
        data: runningData, isLoading: isLoadingRunning, isError: isErrorRunning,
    } = useOfficialMatches(teamId, 'running')

    const {
        data: finishedData, isLoading: isLoadingFinished, isError: isErrorFinished,
    } = useOfficialMatches(teamId, 'finished')

    const upcoming = upcomingData?.pages.flat() || []
    const running = runningData?.pages.flat() || []
    const finished = finishedData?.pages.flat() || []

    return (
        <div className={"flex flex-col items-center mt-20"}>
            {upcoming.length && (
                <div className={"flex flex-col items-center"}>
                    <h2>Upcoming</h2>
                    {upcoming.map(match => <OfficialMatchCard key={match.id}
                                                              opponents={match.opponents.map(o => o.opponent)}
                                                              beginAt={match.begin_at} status={match.status}
                                                              results={match.results} games={match.games.map(g => ({
                        position: g.position,
                        length: g.length, winnerId: g.winner.id
                    }))} leagueName={match.league.name} tournamentName={match.tournament.name}/>)}
                </div>
            )}

            {running.length && (
                <div className={"flex flex-col items-center"}>
                    <h2>Live</h2>
                    {running.map(match => <OfficialMatchCard key={match.id}
                                                             opponents={match.opponents.map(o => o.opponent)}
                                                             beginAt={match.begin_at}
                                                             status={match.status}
                                                             results={match.results}
                                                             games={match.games.map(g => ({
                                                                 position: g.position,
                                                                 length: g.length,
                                                                 winnerId: g.winner.id
                                                             }))}
                                                             leagueName={match.league.name}
                                                             tournamentName={match.tournament.name}/>)}
                </div>
            )}

            {finished.length && (
                <div className={"flex flex-col items-center"}>
                    <h2>Finished</h2>
                    {finished.map(match => <OfficialMatchCard key={match.id}
                                                              opponents={match.opponents.map(o => o.opponent)}
                                                              beginAt={match.begin_at}
                                                              status={match.status}
                                                              results={match.results}
                                                              games={match.games.map(g => ({
                                                                  position: g.position,
                                                                  length: g.length,
                                                                  winnerId: g.winner.id
                                                              }))}
                                                              leagueName={match.league.name}
                                                              tournamentName={match.tournament.name}/>)}
                </div>
            )}

        </div>
    )
}