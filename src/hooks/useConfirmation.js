//useConfirmation.js

import {useState} from "react";

export default function useConfirmation(handleCase){
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

    const openConfirmation = () => {
        setIsConfirmationOpen(true)
    }

    const closeConfirmation = () => {
        setIsConfirmationOpen(false)
    }

    const handleConfirmation = () => {
        handleCase()
        closeConfirmation()
    }

    return {
        isConfirmationOpen,
        openConfirmation,
        closeConfirmation,
        handleConfirmation
    }
}