//PostCard.jsx

export default function PostCard({author, title, text, date}) {
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
            <p>{author}, {title}, {text}, {date}</p>

        </div>
    )
}