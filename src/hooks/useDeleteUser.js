//useDeleteUser.js

import {useEffect, useState} from "react";
import {deleteUser} from "../services/api.js";
import {useQueryClient} from "@tanstack/react-query";

export default function useDeleteUser(){
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const queryClient = useQueryClient()

    const handleDelete = async (nick) => {
        setLoading(true)
        try {
            const response = await deleteUser(nick)
            setError('')
            setSuccess(response.success)
            queryClient.invalidateQueries(['users'])
        } catch (error) {
            setError(error.data)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setError('')
        setSuccess('')
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => handleClose(), 3000)
            return () => clearTimeout(timer)
        }
    }, [success])

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => handleClose(), 3000)
            return () => clearTimeout(timer)
        }
    }, [error])


    return {
        error, success, loading, handleDelete
    }
}