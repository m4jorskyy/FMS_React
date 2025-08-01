//App.jsx

import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Roster from "./pages/Roster.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx";
import Matches from "./pages/Matches.jsx";
import Sponsors from "./pages/Sponsors.jsx";
import News from "./pages/News.jsx";
import Stats from "./pages/Stats.jsx";
import Contact from "./pages/Contact.jsx";
import Highlights from "./pages/Highlights.jsx";
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={"/roster"} element={<Roster/>}/>
                <Route path={"/about"} element={<About/>}/>
                <Route path={"/matches"} element={<Matches/>}/>
                <Route path={"/sponsors"} element={<Sponsors/>}/>
                <Route path={"/gallery"} element={<Gallery/>}/>
                <Route path={"/news"} element={<News/>}/>
                <Route path={"/stats"} element={<Stats/>}/>
                <Route path={"/highlights"} element={<Highlights/>}/>
                <Route path={"/contact"} element={<Contact/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
            </Route>
        </Routes>
    )
}

export default App;
