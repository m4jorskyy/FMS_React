//useRoster.js

import {getPlayers} from "../services/api.js";
import {useQuery} from "@tanstack/react-query";

export default function useRoster() {
   const {
        data: players = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['players'],
        queryFn: async () => {
            const json = await getPlayers()
            return Array.isArray(json) ? json : json.results
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 2,
    })

    return {
        players,
        loading: isLoading,
        error: isError ? error : null
    }
}