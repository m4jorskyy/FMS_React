//News.jsx

import NewsletterForm from "../components/NewsletterForm.jsx";
import PostCard from "../components/PostCard.jsx";
import usePosts from "../hooks/usePosts.js";

export default function News() {
    const {data: posts} = usePosts()

    const postPages = posts?.pages.flatMap(page => page.results) || []
    return (
        <div>
            <h1>News</h1>
            <NewsletterForm/>

            {postPages.map(post =>
                <PostCard key={post.id} title={post.title} author={post.author} date={post.date} text={post.text}/>
            )}

        </div>
    )
}