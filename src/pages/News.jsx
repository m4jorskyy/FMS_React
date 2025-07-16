//News.jsx

import NewsletterForm from "../components/NewsletterForm.jsx";
import Posts from "../components/Posts.jsx";

export default function News() {
    return (
        <div className={"news"}>
            <h1>News</h1>
            <NewsletterForm />
            <Posts />
        </div>
    )
}