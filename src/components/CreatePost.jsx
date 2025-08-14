import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useState} from "react";
import useCreatePost from "../hooks/useCreatePost.js";

export default function CreatePost() {
    const {formData, handleChange, handleClose, handleSubmit} = useCreatePost()
    const [open, setOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setOpen(!open)} className={"border-2 p-2 rounded-lg cursor-pointer"}>Create post...
            </button>
            <div className={`grid grid-cols-2 gap-4 ${open ? null : "hidden"}`}>
                <form onSubmit={handleSubmit}>
                    <input
                        type={"text"}
                        name={"title"}
                        placeholder={"Title"}
                        value={formData.title}
                        onChange={handleChange}
                        className={"placeholder: text-center"}
                    />
                    <textarea
                        name={"text"}
                        placeholder={"Type something in Markdown..."}
                        value={formData.text}
                        onChange={handleChange}
                        className={"font-sans"}
                    ></textarea>
                    <button type={"submit"} className={"cursor-pointer"}>Publish</button>
                </form>

                <div className="border p-2 h-64 overflow-auto font-sans markdown-preview">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {formData.text}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}
