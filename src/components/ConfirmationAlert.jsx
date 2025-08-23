//ConfirmationAlert.jsx

export default function ConfirmationAlert({isOpen, onClose, onConfirm, message}) {
    if (!isOpen) return null

    return (
        <div className={"fixed top-0 left-0 w-screen h-screen z-49 backdrop-blur-lg pointer-events-auto"}>
            <div className={"fixed left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 backdrop-blur-lg border-2 rounded-lg bg-[#140000] p-5"}>
                <h1 className={"text-center text-[40px]"}>WARNING</h1>
                <p className={"mb-8"}>{message}</p>
                <div className={"flex flex-row justify-between"}>
                    <button onClick={onClose} className={"btn-shine"}>No</button>
                    <button onClick={onConfirm} className={"btn-shine"}>Yes</button>
                </div>
            </div>
        </div>
    )
}