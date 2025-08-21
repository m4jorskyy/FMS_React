//useRanks.js

import {useQuery} from "@tanstack/react-query";
import {getPlayerRanks} from "../services/api.js";

export default function useRanks(nick){
    return useQuery({
        queryKey: ['ranks', nick],
        queryFn: async () => {
            const json = await getPlayerRanks(nick)
            return Array.isArray(json) ? json : json.results
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2
    })
}