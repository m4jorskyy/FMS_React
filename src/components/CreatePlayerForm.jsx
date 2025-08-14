//CreatePlayerForm.jsx

import useCreatePlayer from "../hooks/useCreatePlayer.js";
import {X} from 'lucide-react'
import {useState} from "react";

export default function CreatePlayerForm() {
    const {formData, handleChange, handleClose, handleSubmit} = useCreatePlayer()
    const [open, setOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setOpen(!open)} className={"border-2 p-2 rounded-lg cursor-pointer"}>Add player...</button>
            <div className={open ? null : "hidden" }>
                <div>
                    {formData.showAlert ? (
                        <div>
                            <p>{formData.error || formData.success}</p>
                            <button onClick={handleClose}>
                                <X/>
                            </button>
                        </div>
                    ) : null}
                </div>

                <form onSubmit={handleSubmit} className={"flex flex-col items-center"}>
                    <input
                        type={"text"}
                        name={"firstName"}
                        placeholder={"First name"}
                        value={formData.firstName}
                        onChange={handleChange}
                        className={"placeholder: text-center"}
                    />
                    <input
                        type={"text"}
                        name={"lastName"}
                        placeholder={"Last name"}
                        value={formData.lastName}
                        onChange={handleChange}
                        className={"placeholder: text-center"}
                    />
                    <input
                        type={"text"}
                        name={"nick"}
                        placeholder={"Nick"}
                        value={formData.nick}
                        onChange={handleChange}
                        className={"placeholder: text-center"}
                    />
                    <input
                        type={"text"}
                        name={"lane"}
                        placeholder={"Lane"}
                        value={formData.lane}
                        onChange={handleChange}
                        className={"placeholder: text-center"}
                    />
                    <input
                        type={"text"}
                        name={"champion"}
                        placeholder={"Champion"}
                        value={formData.champion}
                        onChange={handleChange}
                        className={"placeholder: text-center"}
                    />
                    <input
                        type={"text"}
                        name={"teamRole"}
                        placeholder={"Team role"}
                        value={formData.teamRole}
                        onChange={handleChange}
                        className={"placeholder: text-center"}
                    />
                    <button type={"submit"} className={"cursor-pointer"}>Add player</button>
                </form>
            </div>
        </div>
    )
}
