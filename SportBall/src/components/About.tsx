import "../assets/css/About.css"
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>Simply enter the name of the player you're interested in, select the sport they play, and our system will retrieve and display relevant information about the player.</p>
           

            <h2>Explore Other Pages:</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/nba">NBA Page</Link></li>
                <li><Link to="/NFL">NFL</Link></li>
                <li><Link to="/MLB">MLB</Link></li>
            </ul>
        </div>
    );
}

export default About;
