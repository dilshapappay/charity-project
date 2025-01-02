import { useEffect, useState } from 'react';
import styles from './OurNeeds.module.css';
import { getItems } from '../services/itemServices';

export default function OurNeeds() {
    const [categories,setCategories] = useState([]);

    const setItems = async function(){
        const items = await getItems();
        setCategories(items)
    }

    useEffect(()=>{
        setItems();
    },[]);

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.logo}>DONATENOW</div>
                <div className={styles.searchBar}>
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search" />
                </div>
                <button>Login</button>
            </div>
            <div className={styles.filters}>
                <select>
                    <option>District</option>
                    <option>thiruvananthapuram</option>
                    <option>kollam</option>
                    <option>pathanamthitta</option>
                    <option>aalapuzha</option>
                    <option>kottayam</option>
                    <option>edukki</option>
                    <option>eranamkulam</option>
                    <option>thrissur</option>
                    <option>palakkad</option>
                    <option>malappuram</option>
                    <option>kozhicode</option>
                    <option>wayanad</option>
                    <option>kannur</option>
                    <option>kasarcode</option>
                </select>
                <select>
                    {categories.map(item=>{
                        return (<option>{item.Name}</option>)
                    })}
                </select>
            </div>
            <div>
                <div className={styles.sectionTitle}>Clothing & Accessories</div>
                <div className={styles.cardContainer}>
                    <div className={styles.card}>
                        <img src="photos/tshirt.png" alt="T-shirt" />
                        <h3>T-shirt</h3>
                        <p>Needed: 2</p>
                        <p>Camp: palakkad</p>
                        <button>Donate</button>
                    </div>
                    <div className={styles.card}></div>
                    <div className={styles.card}></div>
                    <div className={styles.card}></div>
                </div>
                <div>
                    <div className={styles.sectionTitle}>Educational Supplies</div>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <img src="https://via.placeholder.com/200" alt="Book" />
                            <h3>Books</h3>
                            <p>Needed: 5</p>
                            <button>Donate</button>
                        </div>
                        <div className={styles.card}></div>
                        <div className={styles.card}></div>
                        <div className={styles.card}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}