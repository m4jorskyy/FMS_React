//Home.jsx

import {useAuth} from "../context/AuthContext.jsx";
import useGetLatestPost from "../hooks/useGetLatestPost.js";
import PostCard from "../components/PostCard.jsx";
import Alert from "../components/Alert.jsx";
import useOfficialMatches from "../hooks/useOfficialMatches.js";
import {useMemo} from "react";
import OfficialMatchCard from "../components/OfficialMatchCard.jsx";
import {Link} from "react-router-dom";

export default function Home() {
    const {user} = useAuth()
    const teamId = 136773

    const {data: latestPost, isLoading: isLoadingPost, isError: isErrorPost, error: errorPost} = useGetLatestPost()

    const {
        data: upcomingData, isLoading: isLoadingUpcoming, isError: isErrorUpcoming, error: errorUpcoming
    } = useOfficialMatches(teamId, 'not_started')

    const latestUpcoming = useMemo(() => {
        if (!upcomingData) return []
        const upcoming = upcomingData?.pages.flatMap(page => page)
        return upcoming.sort((a, b) => new Date(a.begin_at) - new Date(b.begin_at))
    }, [upcomingData])[0]

    const {
        data: runningData, isLoading: isLoadingRunning, isError: isErrorRunning, error: errorRunning
    } = useOfficialMatches(teamId, 'running')

    const latestRunning = useMemo(() => {
        if (!runningData) return []
        const running = runningData?.pages.flatMap(page => page)
        return running.sort((a, b) => new Date(a.begin_at) - new Date(b.begin_at))
    }, [runningData])[0]

    return (
        <div className={"flex flex-col items-center gap-4 text-center"}>
            <h1 className={"text-[40px] px-4"}>{user !== null ? `Welcome back, ${user}` : "Welcome to the shadows "}</h1>
            <div className={"flex flex-col items-center"}>
                <h1>Latest news</h1>
                {isErrorPost ? (
                    <Alert type={"error"} message={errorPost}/>
                ) : null}

                {isLoadingPost ? (
                    <div className={"animate-l1"}>
                        <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                    </div>
                ) : null}

                {latestPost ? (
                    <>
                        <PostCard
                            text={latestPost.text}
                            date={latestPost.date}
                            author={latestPost.author}
                            title={latestPost.title}
                        />
                        <Link to={"/news"}>Read more</Link>
                    </>

                ) : isLoadingPost ? null : "No news"}
            </div>

            <div className={"flex flex-col items-center"}>
                <h1>Running match</h1>
                {isErrorRunning ? (
                    <Alert type={"error"} message={errorRunning}/>
                ) : null}

                {isLoadingRunning ? (
                    <div className={"animate-l1"}>
                        <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                    </div>
                ) : null}

                {latestRunning ? (
                    <OfficialMatchCard opponents={latestRunning.opponents.map(o => o.opponent)}
                                       beginAt={latestRunning.begin_at} status={latestRunning.status}
                                       results={latestRunning.results} games={latestRunning.games.map(g => ({
                        position: g.position,
                        length: g.length,
                        winnerId: g.winner.id
                    }))} leagueName={latestRunning.league.name} tournamentName={latestRunning.tournament.name}/>
                ) : isLoadingRunning ? null : "No running match"}
            </div>

            <div className={"flex flex-col items-center"}>
                <h1>Upcoming match</h1>
                {isErrorUpcoming ? (
                    <Alert type={"error"} message={errorUpcoming}/>
                ) : null}

                {isLoadingUpcoming ? (
                    <div className={"animate-l1"}>
                        <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                    </div>
                ) : null}

                {latestUpcoming ? (
                    <OfficialMatchCard opponents={latestUpcoming.opponents.map(o => o.opponent)}
                                       beginAt={latestUpcoming.begin_at} status={latestUpcoming.status}
                                       results={latestUpcoming.results} games={latestUpcoming.games.map(g => ({
                        position: g.position,
                        length: g.length,
                        winnerId: g.winner.id
                    }))} leagueName={latestUpcoming.league.name} tournamentName={latestUpcoming.tournament.name}/>
                ) : isLoadingUpcoming ? null : "No upcoming matches"}
            </div>
        </div>
    )
};