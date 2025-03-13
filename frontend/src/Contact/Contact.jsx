import React from "react";
import styles from "./contact.module.css";

export default function ContactUs() {
    return (
        <div className={styles.contactcontainer}>
            <header className={styles.contactheader}>
                <h1>Contact <span>Us</span></h1>
                <p>We'd love to hear from you! Reach out for any inquiries or support.</p>
            </header>

            <section className={styles.contactcontent}>
                <div className={styles.contactinfo}>
                    <h2>Get in Touch</h2>
                    <p>
                        Whether you have a question, need assistance, or just want to say hello,
                        feel free to reach out to us. We're always here to help!
                    </p>
                    
                    <div className={styles.contactdetails} >
                        <p>📍 <strong>Address:</strong> 123 Charity Street, City, Country</p>
                        <p>📧 <strong>Email:</strong> support@donatenow.com</p>
                        <p>📞 <strong>Phone:</strong> +1 234 567 890</p>
                        <p>🕒 <strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</p>
                    </div>
                </div>

                <div className={styles.contactform}>
                    <h2>Send Us a Message</h2>
                    <form>
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
