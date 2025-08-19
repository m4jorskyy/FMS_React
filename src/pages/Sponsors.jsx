//Sponsors.jsx

export default function Sponsors() {
    return (
        <div className={"flex flex-col items-center"}>
            <h1>Sponsors</h1>
            <div className={"flex flex-col items-center"}>
            <p>Stormmedia</p>
            <a href={"https://stormmedia.gg/"} target={"_blank"}>
                <img src={"/sponsorImages/stormmedia.jpg"} alt={"Stormmedia"} className={"w-20 h-20"}/>
            </a>
            </div>
        </div>
    )
}