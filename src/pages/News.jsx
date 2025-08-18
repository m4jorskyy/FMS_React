//News.jsx

import NewsletterForm from "../components/NewsletterForm.jsx";
import PostCard from "../components/PostCard.jsx";
import usePosts from "../hooks/usePosts.js";

export default function News() {
    const {data: posts} = usePosts()

    const postPages = posts?.pages.flatMap(page => page.results) || []
    return (
        <div className={"flex flex-col items-center h-[90vh]"}>
            <NewsletterForm/>

            <div className={"flex flex-col items-center gap-3"}>
                {postPages.map(post =>
                    <PostCard key={post.id} title={post.title} author={post.author} date={post.date} text={post.text}/>
                )}
            </div>

        </div>
    )
}