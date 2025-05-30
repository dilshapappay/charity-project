import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <>
      {/* Landing Section */}
      <div className="container">
        <div className="right-section">
          <div className="logo">
            <h1>DONATENOW</h1>
          </div>
          <div className="main-section">
            <h1 className="heading">Welcome!</h1>
            <p className="quote">
              "The best way to find yourself is to lose yourself in the service of
              others. Every act of generosity creates a ripple of change in the
              world. Giving is not just about making a donation, it's about making a
              difference."
            </p>
            <p className="author">— Mahatma Gandhi</p>
          </div>
          <div className="buttons">
            <Link to="/login">
              <button className="donate-btn">Donate</button>
            </Link>
            <Link to="/our-needs">
              <button className="needs-btn">OurNeeds</button>
            </Link>
          </div>
          <div className="customers">
            <div className="costumer-img">
              <img src="/photos/customer-1.jpg" alt="customer 1" />
              <img src="/photos/customer-2 - Copy.jpg" alt="customer 2" />
              <img src="/photos/customer-3.jpg" alt="customer 3" />
              <img src="/photos/customer-4.jpg" alt="customer 4" />
              <img src="/photos/customer-5.jpg" alt="customer 5" />
              <img src="/photos/customer-6.jpg" alt="customer 6" />
            </div>
            <p>
              <strong>+5,000</strong> products delivered last year!
            </p>
          </div>
        </div>

        <div className="left-section">
          <nav>
            <ul id="nav-links">
              <li><a href="/">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#story">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="/login" class="donatebutton">Donate</a></li>
            </ul>
          </nav>
          <div className="image-container">
            <img src="/photos/donation.png" alt="Donation Image" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features" id="features">
       
        <h2 class="secondary-heading">Features</h2>
        <p className="features-description">
          DonateNow is designed to make the donation process simple, transparent, and impactful.
          Whether you're a donor or a camp organizer, our platform connects you to those in need.
        </p>
        <div className="feature-boxes">
          <div className="feature">
            <i className="fas fa-hand-holding-heart"></i>
            <h3 class="heading-tertiary">Easy Donation Process</h3>
            <p class="feature-para">Our streamlined process makes donating quick and hassle-free.</p>
          </div>
          <div className="feature">
            <i className="fas fa-users"></i>
            <h3 class="heading-tertiary">Camp-wise Item Listing</h3>
            <p class="feature-para">Each camp can list specific items they need from donors.</p>
          </div>
          <div className="feature">
            <i className="fas fa-check-circle"></i>
            <h3 class="heading-tertiary">Transparent Donation Tracking</h3>
            <p class="feature-para">Users can track the status of their donations.</p>
          </div>
        </div>
      </section>

       <section class="story" id="story">
    <div class="story-image">
      <img src="/photos/story.png"width="700px" height="500px" />
    </div>
    <div class="story-text">
      <h2 class="secondary-heading">Our Story</h2>
      <p class="feature-para">DonateNow is more than just a platform – it's a community.</p>
      <div class="columns">
        <div class="mission">
          <i class="fas fa-bullseye"></i>
          <h4 class="heading-tertiary">Our Mission</h4>
          <p class="feature-para">Making charity accessible and impactful for all.</p>
        </div>
        <div class="mission">
          <i class="fas fa-heart"></i>
          <h4 class="heading-tertiary">Our Vision</h4>
          <p class="feature-para">Building a world where generosity knows no bounds.</p>
        </div>
      </div>
      <p class="feature-para" >Join us in our mission to create positive change, one donation at a time.</p>
    </div>
  </section>

   <section class="contact" id="contact">
    <h2 class="secondary-heading">Get in Touch</h2>
    <div class="contact-container">
      
      <div class="contact-info">
        <p class="contact-text">Have questions about donations or want to learn more about our mission? We'd love to hear from you.</p>
      <p><i class="fas fa-phone"></i><strong>Call:</strong> +1 (555) 123-4567</p>
        <p><i class="fas fa-envelope"></i><strong>Email:</strong> donatenowKerala.com</p>
      </div>
      <div class="contactForm">
      <form class="contact-form">
        <input class="text" type="text" placeholder="Name" required />
        <input class="text" type="email" placeholder="Email" required />
        <textarea class="text"  placeholder="Message" required></textarea>
        <button  type="submit">Send</button>
      </form>
      </div>
    </div>
  </section>

 
  <footer>
    <p>&copy; 2025 DonateNow. All rights reserved.</p>  
</footer>

    </>
  );
}
