//useOfficialStatsOptions.js

import {useQuery} from "@tanstack/react-query";
import {getOfficialStatsOptions} from "../services/api.js";

export default function useOfficialStatsOptions(nick, options = {}){
    return useQuery({
        queryKey: ['options', nick],
        queryFn: async () => {
            const json = await getOfficialStatsOptions(nick)

            if(json && typeof json === "object"){
                return json
            }

            return {
                years: [],
                tournaments: [],
                champions: [],
                teams_vs: []
            }
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 2,
        enabled: options.enabled ?? true,
        ...options
    })
}