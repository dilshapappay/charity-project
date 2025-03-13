import React from "react";
import { Link } from "react-router-dom";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
    return (
        <div className={styles.aboutcontainer}>
            <header className={styles.aboutheader}>
                
                <h1>About <span>DonateNow</span></h1>
                <p>Bringing hope,one donation at a time.</p>
            </header>

            <section className={styles.aboutcontent}>
                <div className={styles.abouttext}>
                    <h2>Who We Are</h2>
                    <p>
                        DonateNow is a platform dedicated to connecting donors with people in need. 
                        Our mission is to make charity more accessible, transparent, and impactful.
                    </p>
                </div>

                <div className={styles.abouttext}>
                    <h2>Our Vision</h2>
                    <p>
                        We believe that small acts of kindness can change the world. 
                        Our goal is to build a community where generosity thrives, 
                        ensuring essential items reach those who need them the most.
                    </p>
                </div>

                <div className={styles.abouttext}>
                    <h2>How It Works</h2>
                    <ul>
                        <li>📌 <strong>Find Needs:</strong> View item requests from various camps.</li>
                        <li>🎁 <strong>Donate:</strong> Choose items to donate and contribute to the cause.</li>
                        <li>🤝 <strong>Join as a Volunteer:</strong> Help manage donations and assist in distribution.</li>
                    </ul>
                </div>

                <div className={styles.abouttext}>
                    <h2>Join Us & Make a Difference</h2>
                    <p>
                        Your small contribution can bring a smile to someone's face.  
                        Be a part of our journey and help create a world filled with kindness.
                    </p>
                    <div className={styles.donatebtn}>
                    <Link to="/login" className="donate-btn">Start Donating</Link>
                    </div>
                   
                </div>
            </section>
        </div>
    );
}
