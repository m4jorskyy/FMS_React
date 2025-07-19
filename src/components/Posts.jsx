//Posts.jsx

import usePosts from "../hooks/usePosts.js";

export default function Posts() {
    const {
        posts, error, loading
    } = usePosts()
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