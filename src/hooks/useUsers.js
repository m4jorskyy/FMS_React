//useUsers.js

import {useInfiniteQuery} from "@tanstack/react-query";
import {getUsers} from "../services/api.js";

export default function useUsers(token){
    return useInfiniteQuery({
        queryKey: ['users'],
        queryFn: ({pageParam} = 1) => getUsers(token, pageParam),
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