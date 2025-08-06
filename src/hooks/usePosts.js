//usePosts.js

import {useInfiniteQuery} from "@tanstack/react-query";
import {getPosts} from "../services/api.js";

function usePosts() {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({pageParam = 1}) => getPosts(pageParam),
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

export default usePosts;