//PostCard.jsx

import moment from "moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useState} from "react";

export default function PostCard({author, title, text, date}) {
    const [open, setOpen] = useState(false)

    return (
        <div className={"flex flex-col w-[95vw] border-2 rounded-lg p-4 cursor-pointer"} onClick={() => setOpen(!open)}>
            <div className={"flex flex-row justify-between"}>
                <p>{title}</p>
                <div className={"flex flex-row justify-between gap-2"}>
                    <p>{author}</p>
                    <p>{moment(date).format("DD-MM-YYYY HH:mm")}</p>
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-2 overflow-auto font-sans markdown-preview">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {text}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}