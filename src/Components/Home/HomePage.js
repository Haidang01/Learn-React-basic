import videoHomePage from "../../assets/video-HomePage.mp4";
const HomePage = (props) => {
    return (
        <div className="homePage-container">
            <video autoPlay muted loop  >
                <source
                    src={videoHomePage}
                    type="video/mp4"
                />
            </video>
            <div className="homepage-container">
                <div className="title-1">There's a better way to ask</div>
                <div className="title-2">You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a typeform instead—and make everyone happy.</div>
                <div className="title-3">
                    <button>Get's started.It's free</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage;