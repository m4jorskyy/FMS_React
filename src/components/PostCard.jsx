//PostCard.jsx

export default function PostCard({author, title, text, date}) {
    return (
        <div>
            <p>{author}, {title}, {text}, {date}</p>

        </div>
    )
}