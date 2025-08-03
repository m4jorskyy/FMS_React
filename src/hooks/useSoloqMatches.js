//useSoloqMatches.js

import {useState, useEffect} from 'react'
import {getMatches} from "../services/api.js";
import {useInfiniteQuery} from "@tanstack/react-query";

export default function useSoloqMatches(nick) {
    // const [matches, setMatches] = useState([])
    // const [nextPage, setNextPage] = useState(1)
    // const [hasMore, setHasMore] = useState(false)
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState('')
    //
    // const loadMore = () => {
    //     if (!hasMore || loading) return
    //
    //     setLoading(true)
    //     getMatches(nick, nextPage)
    //         .then(({results, next}) => {
    //             setMatches(prev => [...prev, ...results])
    //             setNextPage(prev => prev + 1)
    //             setHasMore(!!next)
    //         })
    //         .catch(error => setError(error))
    //         .finally(() => setLoading(false))
    // }
    //
    // useEffect(() => {
    //     setMatches([])
    //     setNextPage(1)
    //     setHasMore(false)
    //     setError(null)
    //     setLoading(true)
    //
    //     getMatches(nick, 1)
    //         .then(({results, next}) => {
    //             setMatches(results)
    //             setNextPage(2)
    //             setHasMore(!!next)
    //         })
    //         .catch(err => setError(err))
    //         .finally(() => setLoading(false))
    // }, [nick])
    //
    // return {matches, hasMore, loadMore, loading, error}

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