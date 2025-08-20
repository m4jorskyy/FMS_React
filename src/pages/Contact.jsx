//Contact.jsx

export default function Contact() {
    return (
        <>
            <h1 className={"text-[48px]"}>Contact</h1>
            <div className={"flex flex-row items-center gap-3"}>
                <div className={"flex flex-col items-center"}>
                    <p>TWITTER/FMS</p>
                    <a href={"https://x.com/FajnieMiecSklad"} target={"_blank"}>
                        <img src={"/socialsIcons/Twitter.svg"} alt={"twitter_fms"} className={"w-20 h-20"}/>
                    </a>
                </div>
                <div className={"flex flex-col items-center"}>
                    <p>TWITTER/Rybson</p>
                    <a href={"https://x.com/Rybson__"} target={"_blank"}>
                        <img src={"/socialsIcons/Twitter.svg"} alt={"twitter_fms"} className={"w-20 h-20"}/>
                    </a>
                </div>
            </div>
        </>
    );
}