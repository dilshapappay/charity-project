import { useEffect, useState } from 'react';
import styles from './OurNeeds.module.css';
import { getItems } from '../services/itemService';
import { getRequirements } from '../services/requirementService';
import districts from '../utils/districts';
import { capitalizeFirstLetter } from '../utils/util';

export default function OurNeeds() {
    const [categories, setCategories] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

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
                                    <button className="btn btn-success">Donate</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}