//usePosts.js

import {useEffect, useState} from "react";

function usePosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const request = new Request("https://jsonplaceholder.typicode.com/posts")

        setLoading(true)
        fetch(request)
            .then((response) => response.json())
            .then((json) => {
                setPosts(json);
                setLoading(false)
            })
            .catch(err => {
                setError(err.toString());
                setLoading(false)
            })
    }, [])

    return {
        posts, error, loading
    }
}

export default usePosts;