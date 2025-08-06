//Layout.jsx

import {Outlet, Link} from 'react-router-dom';
import {useAuth} from "./context/AuthContext.jsx";
import useLogout from "./hooks/useLogout.js";

export default function Layout() {
    const { user } = useAuth()
    const { handleLogout, loading } = useLogout()

    return (
        <>
            <header className={"app-header"}>
                <nav style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                }}>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/roster"}>Roster</Link>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/matches"}>Matches</Link>
                    <Link to={"/sponsors"}>Sponsors</Link>
                    <Link to={"/gallery"}>Gallery</Link>
                    <Link to={"/news"}>News</Link>
                    <Link to={"/stats"}>Stats</Link>
                    <Link to={"/highlights"}>Highlights</Link>
                    <Link to={"/contact"}>Contact</Link>
                    <Link to={"/dashboard"}>Dashboard</Link>

                    <div className="user-section">
                        {user ? (
                            <div className="logged-in">
                                <span>Witaj, {user}!</span>
                                <button
                                    onClick={handleLogout}
                                    disabled={loading}
                                    className="logout-btn"
                                >
                                    {loading ? "Ładowanie" : "Wyloguj"}
                                </button>
                            </div>
                        ) : (
                            <div className="logged-out">
                                <Link to={"/login"}>Zaloguj się </Link>
                                <Link to={"/register"}>Zarejestruj się</Link>
                            </div>
                        )}
                    </div>
                </nav>

            </header>
            <main style={{padding: '1rem'}}>
                <Outlet/>
            </main>
        </>
    );
}