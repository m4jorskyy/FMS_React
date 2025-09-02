//Layout.jsx

import {Outlet, Link} from 'react-router-dom';
import {useAuth} from "./context/AuthContext.jsx";
import useLogout from "./hooks/useLogout.js";
import {useState} from "react";
import {AlignJustify, LogIn, X, LogOut} from "lucide-react";
import ConfirmationAlert from "./components/ConfirmationAlert.jsx";
import useConfirmation from "./hooks/useConfirmation.js";

export default function Layout() {
    const {user} = useAuth()
    const {handleLogout, loading} = useLogout()
    const [openMenu, setOpenMenu] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openDisclamer, setOpenDisclamer] = useState(true)

    const {
        isConfirmationOpen,
        openConfirmation,
        closeConfirmation,
        handleConfirmation
    } = useConfirmation(handleLogout)

    return (
        <>
            {openDisclamer ? (
                <div className={"fixed top-0 left-0 w-screen h-screen z-49 backdrop-blur-lg pointer-events-auto"}>
                    <div
                        className={"fixed left-1/2 transform -translate-x-1/2 top-1/2 backdrop-blur-lg -translate-y-1/2 text-center w-[75vw]"}>
                        <div className={"flex flex-col items-center justify-center"}>
                            <div className={"border-2 rounded-lg p-2 mb-4 bg-[#140000]"}>
                                This website serves as a personal portfolio and educational showcase.<br/><br/>
                                No commercial activities are conducted here, and no financial profit is generated.
                                <br/><br/>
                                <strong>Please DO NOT use real personal data when testing features on this site.
                                    Use fictional information for registration and contact forms.</strong>
                                <br/><br/>
                                Any third-party content is used solely for demonstration purposes under fair use
                                provisions.
                            </div>
                            <div className={"border-2 rounded-lg p-2 mb-4 bg-[#140000]"}>
                                Also if something is loading, give it time.
                                <br/>
                                <br/>
                                Server is deployed on Render Platform with Free Tier that
                                <br/>
                                turns server off and on first
                                request it needs to be turned on.
                                <br/>
                                <br/>This takes time.
                                <br/>
                                <strong>Thank you for your patience! </strong>
                            </div>
                            <button onClick={() => setOpenDisclamer(false)} className={"btn-shine"}>
                                I Understand
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {loading ? (
                <div className={"fixed top-0 left-0 w-screen h-screen z-49 backdrop-blur-lg pointer-events-auto"}>
                    <div
                        className={"fixed animate-l1 left-1/2 transform -translate-x-1/2 top-1/2 backdrop-blur-lg -translate-y-1/2"}>
                        <img src={"/logo.png"} alt={"Logo"} className={"w-50 h-50 z-50 pointer-events-none"}/>
                    </div>
                </div>
            ) : null}

            {isConfirmationOpen ? (
                <ConfirmationAlert message={"Do you wanna log out?"} onConfirm={handleConfirmation}
                                   isOpen={isConfirmationOpen} onClose={closeConfirmation}/>
            ) : null}

            <header className={"fixed -top-1 left-0 right-0 z-40 bg-[#140000] border-b border-[#f6223d]"}>
                <nav className={"flex flex-col"}>
                    <div className={"flex flex-row w-full justify-between items-center p-4"}>
                        <button
                            onClick={() => {
                                setOpenMenu(!openMenu)
                                setOpenLogin(false)
                            }}
                            className={"text-white hover:text-[#f6223d] transition-colors"}
                        >
                            <div className="w-6 h-6 relative">
                                <AlignJustify
                                    className={`absolute inset-0 transition-all duration-300 ${openMenu ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}
                                />
                                <X
                                    className={`absolute inset-0 transition-all duration-300 ${openMenu ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
                                />
                            </div>
                        </button>

                        <div className={"absolute left-1/2 transform -translate-x-1/2"}>
                            <a href={"/"}>
                                <img src={"/logo.png"} alt={"Logo"} className={"w-20 h-20"}/>
                            </a>
                        </div>

                        {user ? (
                            <button
                                onClick={openConfirmation}
                                disabled={loading}
                                className={"text-white hover:text-[#f6223d] transition-colors px-3 py-1"}
                            >
                                <LogOut/>
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setOpenLogin(!openLogin)
                                    setOpenMenu(false)
                                }}
                                className={"text-white hover:text-[#f6223d] transition-colors"}
                            >
                                <div className="w-6 h-6 relative">
                                    <LogIn
                                        className={`absolute inset-0 transition-all duration-300 ${openLogin ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}
                                    />
                                    <X
                                        className={`absolute inset-0 transition-all duration-300 ${openLogin ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
                                    />
                                </div>
                            </button>
                        )}
                    </div>
                </nav>
            </header>

            <div
                className={`fixed top-0 right-0 h-full w-80 bg-[#140000] text-[24px] z-30 transform transition-transform duration-300 ease-in-out ${
                    openLogin ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className={"flex flex-col pt-24 px-6 gap-4"}>
                    <Link
                        to={"/login"}
                        className={"cursor-pointer rounded-lg border-2 border-[#f6223d] px-4 py-3 text-[#f6223d] transition-all hover:bg-[#f6223d] hover:text-[#140000] active:opacity-70 text-center"}
                        onClick={() => setOpenLogin(false)}
                    >
                        Log in
                    </Link>
                    <Link
                        to={"/register"}
                        onClick={() => setOpenLogin(false)}
                        className={"cursor-pointer rounded-lg border-2 border-[#f6223d] px-4 py-3 text-[#f6223d] transition-all hover:bg-[#f6223d] hover:text-[#140000] active:opacity-70 text-center"}
                    >
                        Sign up
                    </Link>
                </div>
            </div>

            <div
                className={`fixed top-0 left-0 h-full text-[24px] w-80 bg-[#140000] z-30 transform transition-transform duration-300 ease-in-out ${
                    openMenu ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className={"flex flex-col pt-24 overflow-y-auto scrollbar-hide h-full px-4"}>
                    <Link
                        className={"navbar-links"}
                        to={"/"}
                        onClick={() => setOpenMenu(false)}
                    >
                        Home
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/roster"}
                        onClick={() => setOpenMenu(false)}
                    >
                        Roster
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/about"}
                        onClick={() => setOpenMenu(false)}
                    >
                        About
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/matches"}
                        onClick={() => setOpenMenu(false)}
                    >
                        Matches
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/sponsors"}
                        onClick={() => setOpenMenu(false)}
                    >
                        Sponsors
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/gallery"}
                        onClick={() => setOpenMenu(false)}
                    >
                        Gallery
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/news"}
                        onClick={() => setOpenMenu(false)}
                    >
                        News
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/stats"}
                        onClick={() => setOpenMenu(false)}
                    >
                        Stats
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/highlights"}
                        onClick={() => setOpenMenu(false)}
                    >
                        Highlights
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/contact"}
                        onClick={() => setOpenMenu(false)}
                    >
                        Contact
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/dashboard"}
                        onClick={() => setOpenMenu(false)}
                    >
                        Dashboard
                    </Link>
                </div>
            </div>

            {openMenu && (
                <div
                    className={"fixed inset-0 backdrop-blur-lg bg-opacity-50 z-20"}
                    onClick={() => setOpenMenu(false)}
                />
            )}

            {openLogin && (
                <div
                    className={"fixed inset-0 backdrop-blur-lg bg-opacity-50 z-20"}
                    onClick={() => setOpenLogin(false)}
                />
            )}

            <main className={"flex flex-col justify-center items-center overflow-hidden pt-24"}>
                <Outlet/>
            </main>
            <footer className={"text-center text-[8px]"}>
                © 2025 Igor Suchodolski <br/>Portfolio project - not for commercial use.
            </footer>
        </>
    );
}