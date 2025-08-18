import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useState} from "react";
import useCreatePost from "../hooks/useCreatePost.js";

export default function CreatePost() {
    const {formData, handleChange, handleClose, handleSubmit} = useCreatePost()
    const [open, setOpen] = useState(false)

    return (
        <div className={"h-screen"}>
            {formData.showAlert ? (
                <div>
                    <p>{formData.error || formData.success}</p>
                </div>
            ) : null}

            {formData.loading ? (
                <div className={"animate-l1"}>
                    <img src={"/src/assets/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                </div>
            ) : null}

            <button onClick={() => setOpen(!open)} className={"btn-shine"}>Create post...
            </button>
            <div className={`grid grid-cols-2 gap-4 ${open ? null : "hidden"} border-2 rounded-lg p-4`}>
                <form onSubmit={handleSubmit} className={"flex flex-col gap-2"}>
                    <input
                        type={"text"}
                        name={"title"}
                        placeholder={"Title"}
                        value={formData.title}
                        onChange={handleChange}
                        className={"focus:outline-2 focus:outline-[#f6223d] hover:outline-2 placeholder:text-center rounded-lg"}
                    />
                    <textarea
                        name={"text"}
                        placeholder={"Type something in Markdown..."}
                        value={formData.text}
                        onChange={handleChange}
                        className={"font-sans min-h-64 border-2 focus: outline-0"}
                    ></textarea>
                    <button type={"submit"} className={"cursor-pointer hover:outline-2 rounded-lg"}>Publish</button>
                </form>

                <div className="border-2 p-2 overflow-auto font-sans markdown-preview min-h-64">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {formData.text}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}
