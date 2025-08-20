//useCreatePost.js

import {useEffect, useState} from "react";
import {postPost} from "../services/api.js";

export default function useCreatePost() {
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        success: "",
        error: "",
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
            const response = await postPost(formData.title, formData.text)
            if (response.ok) {
                setFormData(prev => ({
                    ...prev,
                    loading: false,
                    success: "Post created successfully.",
                    error: "",
                    showAlert: true,
                    author: "",
                    title: "",
                    text: "",
                    date: ""
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
        } finally {
            setFormData(prev => ({
                ...prev,
                loading: false
            }))
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