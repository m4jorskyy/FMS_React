//News.jsx

import NewsletterForm from "../components/NewsletterForm.jsx";
import PostCard from "../components/PostCard.jsx";
import usePosts from "../hooks/usePosts.js";
import Alert from "../components/Alert.jsx";

export default function News() {
    const {data: posts, isLoading: isLoadingPosts, isError: isErrorPosts, error: errorPosts} = usePosts()

    const postPages = posts?.pages.flatMap(page => page.results) || []
    return (
        <div className={"flex flex-col items-center h-[90vh]"}>
            <NewsletterForm/>

            {isLoadingPosts ? (
                <div className={"animate-l1"}>
                    <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                </div>
            ) : null}

            {isErrorPosts ? (
                <div>
                    <Alert type={"error"} message={errorPosts}/>
                </div>
            ) : null}


            <div className={"flex flex-col items-center gap-3"}>
                <h1>News</h1>
                {postPages.map(post =>
                    <PostCard key={post.id} title={post.title} author={post.author} date={post.date} text={post.text}/>
                )}
            </div>

        </div>
    )
}