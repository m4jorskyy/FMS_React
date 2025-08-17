//Layout.jsx

import {Outlet, Link} from 'react-router-dom';
import {useAuth} from "./context/AuthContext.jsx";
import useLogout from "./hooks/useLogout.js";
import {useState} from "react";
import {AlignJustify, X} from "lucide-react";

export default function Layout() {
    const {user} = useAuth()
    const {handleLogout, loading} = useLogout()
    const [open, setOpen] = useState(false)

    return (
        <>
            <header className={"fixed top-0 left-0 right-0 z-50 bg-[#140000] border-b border-red-800"}>
                <nav className={"flex flex-col"}>
                    {/* Górny pasek - zawsze widoczny */}
                    <div className={"flex flex-row w-full justify-between items-center p-4"}>
                        {/* Hamburger button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className={"text-white hover:text-red-400 transition-colors z-10 p-1"}
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-6 relative">
                                <AlignJustify
                                    className={`absolute inset-0 transition-all duration-300 ${open ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}
                                />
                                <X
                                    className={`absolute inset-0 transition-all duration-300 ${open ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
                                />
                            </div>
                        </button>

                        {/* Logo - wyśrodkowane */}
                        <div className={"absolute left-1/2 transform -translate-x-1/2"}>
                            <img src={"/logo.png"} alt={"Logo"} className={"w-12 h-12"}/>
                        </div>

                        {/* Auth buttons */}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className={"text-white hover:text-red-400 transition-colors px-3 py-1 rounded"}
                            >
                                {loading ? "Loading..." : "Log out"}
                            </button>
                        ) : (
                            <div className={"flex flex-row gap-3 items-center"}>
                                <Link
                                    to={"/login"}
                                    onClick={() => setOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    to={"/register"}
                                    onClick={() => setOpen(false)}
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {/* Menu boczne - wysuwa się z lewej */}
            <div className={`fixed top-0 left-0 h-full w-50 px-2 bg-[#140000] z-40 transform transition-transform duration-300 ease-in-out ${
                open ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className={"flex flex-col pt-24 overflow-y-auto scrollbar-hide h-full"}>
                    <Link
                        className={"navbar-links"}
                        to={"/"}
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/roster"}
                        onClick={() => setOpen(false)}
                    >
                        Roster
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/about"}
                        onClick={() => setOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/matches"}
                        onClick={() => setOpen(false)}
                    >
                        Matches
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/sponsors"}
                        onClick={() => setOpen(false)}
                    >
                        Sponsors
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/gallery"}
                        onClick={() => setOpen(false)}
                    >
                        Gallery
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/news"}
                        onClick={() => setOpen(false)}
                    >
                        News
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/stats"}
                        onClick={() => setOpen(false)}
                    >
                        Stats
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/highlights"}
                        onClick={() => setOpen(false)}
                    >
                        Highlights
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/contact"}
                        onClick={() => setOpen(false)}
                    >
                        Contact
                    </Link>
                    <Link
                        className={"navbar-links"}
                        to={"/dashboard"}
                        onClick={() => setOpen(false)}
                    >
                        Dashboard
                    </Link>
                </div>
            </div>

            {/* Overlay gdy menu jest otwarte */}
            {open && (
                <div
                    className={"fixed inset-0 backdrop-blur-lg bg-opacity-20 z-30"}
                    onClick={() => setOpen(false)}
                />
            )}

            <main className={"flex flex-col justify-center items-center overflow-hidden pt-24"}>
                <Outlet/>
            </main>
        </>
    );
}