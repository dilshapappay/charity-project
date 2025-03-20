import React from "react";
import styles from "./AboutUs.module.css";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">DONATE<span>NOW</span></Link>
        </div>
        <ul className={styles.navLinks}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/donate" className={styles.donateBtn}>Donate</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className={`${styles.heroSection} ${styles.fadeIn}`}>
        <div className={styles.aboutBox}>
          <div className={styles.imageContainer}>
            <img src="/photos/helping hand.png" alt="Helping Hands" />
          </div>
          <div className={styles.textContent}>
            <h2>About <span>DonateNow</span></h2>
            <p>
              DonateNow is a platform dedicated to connecting donors with people in need.
              Our mission is to make charity more accessible, transparent, and impactful.
              We believe that small acts of kindness can change the world. 
             Our goal is to build a community where generosity thrives, 
             ensuring essential items reach those who need them the most.
            </p>
            <Link to="/contact" className={styles.learnMore}>Learn More</Link>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className={`${styles.cardsContainer} ${styles.slideUp}`}>
        <div className={styles.card}>
          <h3>01</h3>
          <h2>Our Mission</h2>
                   <p>We are committed to making charity more accessible and transparent. By providing a well-organized platform, we ensure that every donation is utilized efficiently, reducing waste and maximizing impact. Our structured approach allows for real-time tracking, enabling donors to see how their contributions make a difference.    </p>    
          </div>
        <div className={styles.card}>
          <h3>02</h3>
          <h2>How It Works</h2>
          <p>ur system enables camp administrators to list the essential items
             their communities need. Donors can browse these requests and offer support through item donations. Additionally, individuals can share unused materials, ensuring that no resource goes to waste. Volunteers help verify donations, maintaining the integrity of our platform and ensuring
             fairness in the distribution process.</p>
        </div>
        <div className={styles.card}>
          <h3>03</h3>
          <h2>Why It Matters</h2>
          <p>Millions of people around the world struggle to access basic necessities. Our platform serves as a bridge, connecting those who can give with those who are in need. Through transparency and efficiency, we aim to build a network of kindness where no one is left behind.</p>
        </div>

         
      </div>
      <footer className={styles.footer}>
          <div className={styles.footerText}>
            <p>DonateNow &copy; 2025</p>
          </div>
          </footer>
      
    </div>

  );
}
