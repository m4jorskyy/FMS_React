//Posts.jsx

import {useEffect, useState} from "react";

export default function Posts() {

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

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '1rem',
            margin: '0.5rem 0',
            color: '#fff',
            width: '90%',
        }}>
            {loading === true ? <p>Ładowanie...</p> : ""}
            {error !== '' ? <p style={{
                color: 'red'
            }}>error</p> : ""}

            {posts.slice(0, 10).map((post) => (
                <div key={post.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    border: '1px solid #ccc',
                    padding: '1rem',
                    margin: '0.5rem 0',
                    color: '#fff',
                    width: '90%',
                }}>{post.title}</div>
            ))}
        </div>
    )

}