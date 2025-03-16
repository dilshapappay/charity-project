import { useEffect, useState } from 'react';
import styles from './OurNeeds.module.css';
import { getItems } from '../services/itemService';
import { getRequirements } from '../services/requirementService';
import districts from '../utils/districts';
import { capitalizeFirstLetter } from '../utils/util';
import { useNavigate, useLocation } from "react-router-dom";

export default function OurNeeds() {
    const [categories, setCategories] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const fetchAllItems = async () => {
        let allItems = [];
        let page = 1;
        const limit = 10;
        let hasMoreItems = true;
    
        while (hasMoreItems) {
          const response = await getItems(page, limit);
          const items = response.data;
          allItems = [...allItems, ...items];
          if (items.length < limit) {
            hasMoreItems = false;
          } else {
            page++;
          }
        }
    
        setCategories(allItems);
      };
 

    const handleSearch = async function () {
        const requirements = await getRequirements(selectedDistrict,selectedCategory);
          if(requirements.length === 0)
        {
            setRequirements([])
            return; 
        }    

        // Group the requirements by Name
        const groupedRequirements = requirements.data.reduce((acc, requirement) => {
            const { District } = requirement;
            if (!acc[District]) {
                acc[District] = [];
            }
            acc[District].push(requirement);
            return acc;
        }, {});
        setRequirements(groupedRequirements);
    };

    useEffect(() => {
        fetchAllItems();
        handleSearch();
    }, []);

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const donateNow = (requirementId) => {
        const tokenExist = localStorage.getItem('token');
        if (tokenExist) {
            navigate("/main/addorder?reqid=" + requirementId);
        } else {
            const redirectUrl = encodeURIComponent(`/main/addorder?reqid=${requirementId}`);
            navigate(`/login?redirect=${redirectUrl}`);
        }
    }

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
                <select value={selectedDistrict} onChange={handleDistrictChange}>
                    <option value="">Select District</option>
                    {Object.values(districts).map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>

                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    {categories.map(item => {
                        return (<option key={item.Id} value={item.Id}>{item.Name}</option>)
                    })}
                </select>
                <button className={styles.button} onClick={handleSearch}>Search</button>
            </div>
            <div>
                {Object.keys(requirements).map((district) => (
                    <div key={district}>
                        <div className={styles.sectionTitle}><h3>{capitalizeFirstLetter(district)}</h3></div>
                        <div className={styles.cardContainer}>
                            {requirements[district].map((requirement, index) => (
                                <div key={index} className={styles.card}>
                                    <h3>{requirement.Name}</h3>
                                    <p>{requirement.Description}</p>
                                    <p>Needed: {requirement.RequiredQuantity}</p>
                                    <p>District: {requirement.District}</p>
                                    <button className="btn btn-success" onClick={() => donateNow(requirement.Id)}>Donate</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}