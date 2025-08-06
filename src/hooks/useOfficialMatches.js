//useOfficialMatches.js

import {useInfiniteQuery} from "@tanstack/react-query";
import {getOfficialMatches} from "../services/api.js";

export default function useOfficialMatches(teamId, status) {
    return useInfiniteQuery({
        queryKey: ['officialMatches', teamId, status],
        queryFn: ({pageParam = 1}) => getOfficialMatches(teamId, status, pageParam),
        getNextPageParam: lastPage => {
            if(!lastPage.meta || !lastPage.meta.next) return undefined
            const url = new URL(lastPage.next)
            return Number(url.searchParams.get('page[number]'))
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2
    })
}