import { Link } from "react-router-dom"
import Nav_bar from "../Navbar/Navbar"
import './CSS/home.css'
import HomeComponent from "./BackgroundSlider"
import BackgroundSlider from "./BackgroundSlider"
import About from "./About"
import Features from "./Features"
import Contact from "./Contact"
import FAQ from "./FAQ"
import UpcomingFeatures from "./Upcoming"

const Home = () => {
    return (
        <div className="Home" >
            <div className="Home-content">
            <Nav_bar />
            <BackgroundSlider/>
            <About/>
            <Features/>
            {/* <FAQ/> */}
            <UpcomingFeatures/>
            {/* <Contact/> */}
            </div>
        </div>
    )
}
export default Home