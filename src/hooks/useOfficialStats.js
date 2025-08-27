//useOfficialStats.js

import {useInfiniteQuery} from "@tanstack/react-query";
import {getOfficialStats} from "../services/api.js";

export default function useOfficialStats(nick, champion, year, tournament, teamVs, options = {}) {
    return useInfiniteQuery({
        queryKey: ['officialStats', nick, champion, year, tournament, teamVs],
        queryFn: async ({pageParam = 1}) => {
            const json = await getOfficialStats(pageParam, nick, champion, year, tournament, teamVs)
            if (json && typeof json === "object") {
                return json
            }

            return {
                aggregated_stats: {
                    total_matches: 0,
                    total_kills: 0,
                    total_deaths: 0,
                    total_assists: 0,
                    total_cs: 0,
                    total_gold: 0,
                    total_team_gold: 0,
                    total_damage: 0,
                    total_team_damage: 0,
                    total_vision_score: 0,
                    wins: 0,
                    avg_kda: 0,
                    avg_cs_per_min: 0,
                    avg_damage_per_min: 0,
                    win_rate: 0,
                    avg_kill_participation: 0,
                    avg_gold_participation: 0,
                    avg_dmg_participation: 0,
                    avg_vision_score: 0
                },
                matches: {
                    results: [],
                    count: 0,
                    next: null,
                    previous: null
                }
            }
        },
        getNextPageParam: lastPage => {
            if (!lastPage.matches?.next) return undefined
            const url = new URL(lastPage.matches?.next)
            return Number(url.searchParams.get('page'))
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
        enabled: options.enabled ?? true,
        ...options
    })
}