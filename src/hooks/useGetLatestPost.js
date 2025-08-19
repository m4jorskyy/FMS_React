//useGetLatestPost.js

import {getLatestPost} from "../services/api.js";
import {useQuery} from "@tanstack/react-query";

export default function useGetLatestPost() {
    return useQuery({
        queryKey: ['latest_post'],
        queryFn: getLatestPost,
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2
    })
}
