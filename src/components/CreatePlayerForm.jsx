//CreatePlayerForm.jsx

import useCreatePlayer from "../hooks/useCreatePlayer.js";
import {useState} from "react";
import Alert from "./Alert.jsx";

export default function CreatePlayerForm() {
    const {formData, handleChange, handleClose, handleSubmit} = useCreatePlayer()
    const [open, setOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setOpen(!open)} className={"btn-shine"}>Add player</button>
            <div className={`border-2 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-150 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
                {formData.showAlert ? (
                    <div onClick={handleClose}>
                        <Alert type={formData.error === "" ? "success" : "error"}
                               message={formData.error === "" ? formData.success : formData.error}/>
                    </div>
                ) : null}

                {formData.loading ? (
                    <div className={"animate-l1"}>
                        <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className={"flex flex-col gap-3 items-center p-4"}>
                    <input
                        type={"text"}
                        name={"firstName"}
                        placeholder={"First name"}
                        value={formData.firstName}
                        onChange={handleChange}
                        className={"text-center animate-pulseGlow border-2 outline-none"}
                    />
                    <input
                        type={"text"}
                        name={"lastName"}
                        placeholder={"Last name"}
                        value={formData.lastName}
                        onChange={handleChange}
                        className={"text-center animate-pulseGlow border-2 outline-none"}
                    />
                    <input
                        type={"text"}
                        name={"nick"}
                        placeholder={"Nick"}
                        value={formData.nick}
                        onChange={handleChange}
                        className={"text-center animate-pulseGlow border-2 outline-none"}
                    />
                    <input
                        type={"text"}
                        name={"lane"}
                        placeholder={"Lane"}
                        value={formData.lane}
                        onChange={handleChange}
                        className={"text-center animate-pulseGlow border-2 outline-none"}
                    />
                    <input
                        type={"text"}
                        name={"champion"}
                        placeholder={"Champion"}
                        value={formData.champion}
                        onChange={handleChange}
                        className={"text-center animate-pulseGlow border-2 outline-none"}
                    />
                    <input
                        type={"text"}
                        name={"teamRole"}
                        placeholder={"Team role"}
                        value={formData.teamRole}
                        onChange={handleChange}
                        className={"text-center animate-pulseGlow border-2 outline-none"}
                    />
                    <input
                        type="text"
                        name="twitter"
                        placeholder="Twitter link"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="text-center animate-pulseGlow border-2 outline-none"
                    />

                    <input
                        type="text"
                        name="youtube"
                        placeholder="YouTube link"
                        value={formData.youtube}
                        onChange={handleChange}
                        className="text-center animate-pulseGlow border-2 outline-none"
                    />

                    <input
                        type="text"
                        name="twitch"
                        placeholder="Twitch link"
                        value={formData.twitch}
                        onChange={handleChange}
                        className="text-center animate-pulseGlow border-2 outline-none"
                    />

                    <input
                        type="text"
                        name="kick"
                        placeholder="Kick link"
                        value={formData.kick}
                        onChange={handleChange}
                        className="text-center animate-pulseGlow border-2 outline-none"
                    />

                    <input
                        type="text"
                        name="instagram"
                        placeholder="Instagram link"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="text-center animate-pulseGlow border-2 outline-none"
                    />

                    <input
                        type={"text"}
                        name={"tiktok"}
                        placeholder={"TikTok link"}
                        value={formData.tiktok}
                        onChange={handleChange}
                        className={"text-center animate-pulseGlow border-2 outline-none"}
                    />

                    <button type={"submit"} className={"btn-shine"}>Add player</button>
                </form>
            </div>
        </div>
    )
}
