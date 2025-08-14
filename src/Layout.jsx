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
            <header className={"z-10 bg-[#140000]"}>
                <nav className={"flex flex-col overflow-x-hidden flex-wrap items-center justify-center"}>
                    <div className={"flex flex-row w-screen justify-between p-3"}>
                        <button onClick={() => setOpen(!open)} className={"cursor-pointer"}>
                            <div className="grid place-items-center w-6 h-6">
                                <span
                                    className={`transition-opacity duration-300 col-start-1 row-start-1 ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                                    <AlignJustify/>
                                </span>

                                <span
                                    className={`transition-opacity duration-300 col-start-1 row-start-1 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                                    <X/>
                                </span>
                            </div>
                        </button>

                        <img src={"/src/assets/logo.png"} alt={"Logo"} className={"absolute w-15 h-15 left-47 top-1"}/>

                        {user ? (
                            <div className={"items-center"}>
                                <button
                                    onClick={handleLogout}
                                    disabled={loading}
                                    className={"rounded-lg border-2 p-2 mr-2"}
                                >
                                    {loading ? "Loading..." : "Log out"}
                                </button>
                            </div>
                        ) : (
                            <div className={`flex flex-row justify-between items-center ${open ? "mr-4" : ""}`}>
                                <Link to={"/login"} className={"mr-2"} onClick={() => setOpen(false)}>Log in</Link>
                                <Link to={"/register"} onClick={() => setOpen(false)}>Sign up</Link>
                            </div>
                        )}
                    </div>
                    {open && (
                        <>
                        <Link className={"navbar-links"} to={"/"} onClick={() => setOpen(!open)}>Home</Link>
                            <Link className={"navbar-links"} to={"/roster"} onClick={() => setOpen(!open)}>Roster</Link>
                            <Link className={"navbar-links"} to={"/about"} onClick={() => setOpen(!open)}>About</Link>
                            <Link className={"navbar-links"} to={"/matches"}
                                  onClick={() => setOpen(!open)}>Matches</Link>
                            <Link className={"navbar-links"} to={"/sponsors"}
                                  onClick={() => setOpen(!open)}>Sponsors</Link>
                            <Link className={"navbar-links"} to={"/gallery"}
                                  onClick={() => setOpen(!open)}>Gallery</Link>
                            <Link className={"navbar-links"} to={"/news"} onClick={() => setOpen(!open)}>News</Link>
                            <Link className={"navbar-links"} to={"/stats"} onClick={() => setOpen(!open)}>Stats</Link>
                            <Link className={"navbar-links"} to={"/highlights"}
                                  onClick={() => setOpen(!open)}>Highlights</Link>
                            <Link className={"navbar-links"} to={"/contact"}
                                  onClick={() => setOpen(!open)}>Contact</Link>
                            <Link className={"navbar-links"} to={"/dashboard"}
                                  onClick={() => setOpen(!open)}>Dashboard</Link>
                        </>
                    )}
                </nav>
            </header>
            <main className={"flex flex-col justify-center items-center overflow-hidden"}>
                <Outlet/>
            </main>
        </>
    );
}