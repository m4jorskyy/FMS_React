//useSoloqMatches.js

import {useState, useEffect} from 'react'
import players from "../data/players.js";

const riotApiKey = import.meta.env.VITE_RIOT_API_KEY
const region = "europe"

async function getPuuid(gameName, tagLine) {
    const urlRequest = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`

    const response = await fetch(urlRequest, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Token': riotApiKey
        }
    })

    if (!response.ok) {
        throw new Error(`Riot API error: ${response.statusText}`)
    }

    return await response.json()
}

async function getMatchIds(gameName, tagLine, start = 0, count = 2) {
    const {puuid} = await getPuuid(gameName, tagLine)
    const urlRequest = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`
    const response = await fetch(urlRequest, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Token': riotApiKey
        }
    })

    if (!response.ok) {
        throw new Error(`Riot API error: ${response.statusText}`)
    }

    return await response.json()
}

async function getMatchDetails(puuid, matchId) {
    const urlRequest = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`;

    const response = await fetch(urlRequest, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Token': riotApiKey
        }
    });

    if (!response.ok) {
        throw new Error(`Riot API error: ${response.statusText}`);
    }

    return await response.json();
}

async function extractMatchStats(rawMatch, puuid) {
    const matchId = rawMatch.metadata.matchId;
    const gameDuration = rawMatch.info.gameDuration;
    const participant = rawMatch.info.participants.find(p => p.puuid === puuid);
    const {kills, deaths, assists, championName, lane, win, teamPosition} = participant;

    return {matchId, gameDuration, kills, deaths, assists, championName, lane, win, teamPosition}
}


function useSoloqMatches() {
    const [matchesByPlayer, setMatchesByPlayer] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)

        async function fetchAll() {
            try {
                const allPromises = players.map(async (player) => {
                    const aggregatedMatches = []

                    for (const riotId of player.summonerNames) {
                        const [gameName, tagLine] = riotId.split("#")
                        const { puuid } = await getPuuid(gameName, tagLine)
                        const matchIds = await getMatchIds(gameName, tagLine)

                        const statsPromises = matchIds.map(matchId => {
                            return getMatchDetails(puuid, matchId).then(raw => extractMatchStats(raw, puuid))
                        })

                        const stats = await Promise.all(statsPromises)

                        aggregatedMatches.push(...stats)
                    }
                    return {playerId: player.id, matches: aggregatedMatches}
                })

                const results = await Promise.all(allPromises)

                const byPlayer = {}
                results.forEach(({playerId, matches}) => {
                    byPlayer[playerId] = matches;
                })

                setMatchesByPlayer(byPlayer)

            } catch (e) {
                setError(e.toString())
            } finally {
                setLoading(false)
            }
        }

        fetchAll().then(r => r)
    }, [])

    return {matchesByPlayer, loading, error}
}

export default useSoloqMatches;