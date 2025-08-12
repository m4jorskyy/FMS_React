//CreatePlayerForm.jsx

import useCreatePlayer from "../hooks/useCreatePlayer.js";

export default function CreatePlayerForm() {
    const {formData, handleChange, handleClose, handleSubmit} = useCreatePlayer()

    return (
        <div>
            <div>
                {formData.showAlert ? (
                <div>
                    <p>{formData.error || formData.success}</p>
                    <button onClick={handleClose}>
                        ×
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
    )
}