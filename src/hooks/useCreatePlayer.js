//useCreatePlayer.js

import {useEffect, useState} from "react";
import {postPlayer} from "../services/api.js";

export default function useCreatePlayer() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nick: "",
        lane: "",
        champion: "",
        teamRole: "",
        twitter: "",
        youtube: "",
        twitch: "",
        kick: "",
        instagram: "",
        tiktok: "",
        loading: false,
        error: "",
        success: "",
        showAlert: false
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setFormData(prev => ({
            ...prev,
            loading: true,
            error: "",
            success: "",
            showAlert: false
        }))

        try {
            const response = await postPlayer(
                formData.firstName,
                formData.lastName,
                formData.nick,
                formData.lane,
                formData.champion,
                formData.teamRole,
                formData.twitter,
                formData.youtube,
                formData.twitch,
                formData.kick,
                formData.instagram,
                formData.tiktok,
            )

            if (response.ok) {
                setFormData(prev => ({
                    ...prev,
                    loading: false,
                    success: "Player created successfully.",
                    error: "",
                    showAlert: true,
                    firstName: "",
                    lastName: "",
                    nick: "",
                    lane: "",
                    champion: "",
                    teamRole: "",
                    twitter: "",
                    youtube: "",
                    twitch: "",
                    kick: "",
                    instagram: "",
                    tiktok: ""
                }));
            }
        } catch (error) {
            if (error.data) {
                const errorMessages = Object.entries(error.data)
                    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                    .join('\n')
                setFormData(prev => ({
                    ...prev,
                    loading: false,
                    error: errorMessages,
                    success: "",
                    showAlert: true
                }))
            } else {
                setFormData(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message || "Something went wrong. Try again.",
                    success: "",
                    showAlert: true
                }))
            }
        }
    }

    const handleClose = () => {
        setFormData(prev => ({
            ...prev,
            showAlert: false,
            error: "",
            success: ""
        }))
    }

    useEffect(() => {
        if (formData.success) {
            const timer = setTimeout(() => {
                handleClose()
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [formData.success])

    return {
        formData,
        handleSubmit,
        handleClose,
        handleChange
    }
}