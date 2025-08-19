//Matches.jsx

import useOfficialMatches from "../hooks/useOfficialMatches.js";
import OfficialMatchCard from "../components/OfficialMatchCard.jsx";
import Alert from "../components/Alert.jsx";

export default function Matches() {
    const teamId = 136773

    const {
        data: upcomingData, isLoading: isLoadingUpcoming, isError: isErrorUpcoming, error: errorUpcoming
    } = useOfficialMatches(teamId, 'not_started')

    const {
        data: runningData, isLoading: isLoadingRunning, isError: isErrorRunning, error: errorRunning
    } = useOfficialMatches(teamId, 'running')

    const {
        data: finishedData, isLoading: isLoadingFinished, isError: isErrorFinished, error: errorFinished
    } = useOfficialMatches(teamId, 'finished')

    const upcoming = upcomingData?.pages.flat() || []
    const running = runningData?.pages.flat() || []
    const finished = finishedData?.pages.flat() || []

    return (
        <div className={"flex flex-col items-center"}>
            {isLoadingUpcoming ? (
                <div className={"animate-l1"}>
                    <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                </div>
            ) : null}

            {isErrorUpcoming ? (
                <div>
                    <Alert type={"error"} message={errorUpcoming}/>
                </div>
            ) : null}

            {upcoming.length ? (
                <div className={"flex flex-col items-center"}>
                    <h1 className={"text-[60px]"}>Upcoming</h1>
                    {upcoming.map(match => <OfficialMatchCard key={match.id} opponents={match.opponents.map(o => o.opponent)} beginAt={match.begin_at} status={match.status} results={match.results} games={match.games.map(g => ({position: g.position, length: g.length, winnerId: g.winner.id}))} leagueName={match.league.name} tournamentName={match.tournament.name}/>)}
                </div>
            ) : null}

            {isLoadingRunning ? (
                <div className={"animate-l1"}>
                    <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                </div>
            ) : null}

            {isErrorRunning ? (
                <div>
                    <Alert type={"error"} message={errorRunning}/>
                </div>
            ) : null}

            {running.length ? (
                <div className={"flex flex-col items-center"}>
                    <h1 className={"text-[60px]"}>Live</h1>
                    {running.map(match => <OfficialMatchCard key={match.id} opponents={match.opponents.map(o => o.opponent)} beginAt={match.begin_at} status={match.status} results={match.results} games={match.games.map(g => ({position: g.position, length: g.length, winnerId: g.winner.id}))} leagueName={match.league.name} tournamentName={match.tournament.name}/>)}
                </div>
            ) : null}

            {isLoadingFinished ? (
                <div className={"animate-l1"}>
                    <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                </div>
            ) : null}

            {isErrorFinished ? (
                <div>
                    <Alert type={"error"} message={errorFinished}/>
                </div>
            ) : null}

            {finished.length ? (
                <div className={"flex flex-col items-center"}>
                    <h1 className={"text-[60px]"}>Finished</h1>
                    {finished.map(match => <OfficialMatchCard key={match.id} opponents={match.opponents.map(o => o.opponent)} beginAt={match.begin_at} status={match.status} results={match.results} games={match.games.map(g => ({position: g.position, length: g.length, winnerId: g.winner.id}))} leagueName={match.league.name} tournamentName={match.tournament.name}/>)}
                </div>
            ) : null}

        </div>
    )
}