import React from "react";
import { Link } from "react-router-dom";
import styles from "./contact.module.css";

export default function ContactUs() {
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
                    <li><Link to="/login" className={styles.donateBtn}>Donate</Link></li>
                </ul>
            </nav>
            <div className={styles.content}>
                <div className={`${styles.leftSection} ${styles.slideUp}`}>
                    {/* Image */}
                    <div className={styles.imageContainer}>
                        <img src="/photos/volunteer.png" alt="contact" />
                    </div>
                </div>
                <div className={`${styles.rightSection} ${styles.fadeIn}`}>
                    {/* Contact Form */}
                    <div className={styles.contactForm}>
                        <h2>Contact Us</h2>
                        <form>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter your Name" required />

                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter a valid email address" required />

                            <label htmlFor="message">Message</label>
                            <textarea id="message" placeholder="Enter your message" required></textarea>


                            <button type="submit">SUBMIT</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className={`${styles.infoCards} ${styles.slideUp}`}>
                <div className={styles.card}>
                    <h3>CALL US</h3>
                    <p>+1 (234) 567-891</p>
                    <p>+1 (234) 987-654</p>
                </div>

                <div className={styles.card}>
                    <h3>LOCATION</h3>
                    <p>121 Rock Street, 21 Avenue</p>
                    <p>New York, NY 92103-9000</p>
                </div>

                <div className={styles.card}>
                    <h3>HOURS</h3>
                    <p>Mon - Fri: 11 am - 8 pm</p>
                    <p>Sat, Sun: 6 am - 8 pm</p>
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