import { Link } from "react-router-dom";
export default function Welcome() {
    return (
        <div class="container">
            <div class="right-section">
                <div class="logo">
                    <h1>DONATENOW</h1>
                </div>
                <div class="main-section">
                    <h1 class="heading">Welcome!</h1>
                    <p class="quote">"The best way to find yourself is to lose yourself
                        in the service of others. Every act of generosity creates a ripple of
                        change in the world. Giving is not just about making a donation, it's about
                        making a difference."</p>
                    <p class="author">— Mahatma Gandhi</p>
                </div>
                <div class="buttons">
                <Link to="/login">
                <button class="donate-btn">Donate</button>
                </Link> 
                    <Link to="/our-needs">
                        <button className="needs-btn">OurNeeds</button>
                    </Link> 
                    </div>
                <div class="customers">
                    <div class="costumer-img">
                        <img src="photos/customer-1.jpg" alt="customer 1" />
                        <img src="photos/customer-2 - Copy.jpg" alt="customer 2" />
                        <img src="photos/customer-3.jpg" alt="customer 3" />
                        <img src="photos/customer-4.jpg" alt="customer 4" />
                        <img src="photos/customer-5.jpg" alt="customer 5" />
                        <img src="photos/customer-6.jpg" alt="customer 6" />
                    </div>
                    <p><strong>+5,000</strong> products delivered last year!</p>
                </div>
            </div>
            <div class="left-section">
                <nav>

                    <ul id="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="/login">Donate</a></li>
                    </ul>
                </nav>
                <div class="image-container">
                    <img src="photos/donation.png" alt="Donation Image" />
                </div>
            </div>
        </div>
    );
}