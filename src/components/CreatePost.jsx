import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useState} from "react";
import useCreatePost from "../hooks/useCreatePost.js";
import Alert from "./Alert.jsx";

export default function CreatePost() {
    const {formData, handleChange, handleClose, handleSubmit} = useCreatePost()
    const [open, setOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setOpen(!open)} className={"btn-shine"}>Create post</button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-300 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"} text-center border-2 rounded-lg p-4`}>
                <h1 className={"mb-3 mt-1"}>Create Post</h1>
                <div className={`grid grid-cols-2 gap-4`}>
                    {formData.showAlert ? (
                        <div onClick={handleClose}>
                            <Alert type={formData.error === "" ? "success" : "error"}
                                   message={formData.error === "" ? formData.success : formData.error}/>
                        </div>
                    ) : null}

                    {formData.loading ? (
                        <div className={"animate-l1"}>
                            <img src={"/src/assets/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                        </div>
                    ) : null}
                    <form onSubmit={handleSubmit} className={"flex flex-col gap-2"}>
                        <input
                            type={"text"}
                            name={"title"}
                            placeholder={"Title"}
                            value={formData.title}
                            onChange={handleChange}
                            className={"animate-pulseGlow text-center border-2 outline-none"}
                        />
                        <textarea
                            name={"text"}
                            placeholder={"Type something in Markdown..."}
                            value={formData.text}
                            onChange={handleChange}
                            className={"font-sans min-h-64 border-2 focus: outline-0 rounded-lg p-2"}
                        ></textarea>
                        <button type={"submit"} className={"btn-shine"}>Publish</button>
                    </form>

                    <div className="border-2 p-2 overflow-auto font-sans markdown-preview min-h-64 rounded-lg">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {formData.text}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
