//useSoloqMatches.js

import {getMatches} from "../services/api.js";
import {useInfiniteQuery} from "@tanstack/react-query";

export default function useSoloqMatches(nick) {
    return useInfiniteQuery({
        queryKey: ['matches', nick],
        queryFn: ({pageParam = 1}) => getMatches(nick, pageParam),
        getNextPageParam: lastPage => {
            if (!lastPage.next) return undefined
            const url = new URL(lastPage.next)
            return Number(url.searchParams.get('page'))
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2
    })
}