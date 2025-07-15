//Layout.jsx

import {Outlet, Link} from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <header style={{
                padding: '1rem',
                background: '#111',
                color: 'white'
            }}>
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
                </nav>
            </header>
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </>
    );
}