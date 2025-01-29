import { useEffect, useState } from 'react';
import{ getCamps,deleteCamp} from '../services/campService';
import styles from './camp.module.css';
import { Link } from 'react-router-dom';  
import AddCampForm from './addCamp';



export default function Camps() {

    const [camps, setCamps] = useState([]);
    const [showForm, setShowForm] = useState(false);
 
    const fetchCamps = async function () {
        
            const camps = await getCamps();
            setCamps(camps);
        
    }

    useEffect(() => {
        fetchCamps();
    }, []);

    const handleAddClick = () => {
        setShowForm(true); 
    }

     const handleDeleteClick = async (Id) => {
            if (window.confirm("Are you sure you want to delete this order?")) {
              try {
                var result = await deleteCamp(Id);
                alert(result.message);
                fetchCamps();
              } catch (error) {
                
                alert(error.message);
              }
            }
          };

return (
    <div className={styles.tableContainer}>
            <h2>Camp Details</h2>
            <Link to="/main/addCamp">
    <button className={styles.addButton}onClick={handleAddClick} >+Add</button>
           
            {showForm && <AddCampForm />}
        </Link>
            <table>
                <thead> 
                    <tr>
                        <th>Sl</th>
                        <th>Camp Admin</th>
                          <th>Camp Name</th>
                           <th>Description</th>
                           <th>Location Address</th>
                          <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {camps.map((camp, index) => (
                    <tr key={camp._id}>
                        <td>{index + 1}</td>
                        <td>
                            {`${camp.FirstName} ${camp.LastName}`}
                        </td>
                        <td>{camp.Name}</td>
                        <td>{camp.Description}</td>
                        <td>{camp.LocationAddress}</td>
                        <td>  <div className={styles.actionIcons}>
                                <i className="material-icons" >edit</i>

                                <i className="material-icons"  onClick={() => handleDeleteClick(camp.Id)} >delete</i>
                            </div></td>
                    </tr>
                ))}
            </tbody>

</table>
    </div>
);
}
