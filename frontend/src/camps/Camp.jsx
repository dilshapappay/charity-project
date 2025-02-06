import { useEffect, useState } from 'react';
import{ getCamps,deleteCamp} from '../services/campService';
import styles from './camp.module.css';
import { Link } from 'react-router-dom';  
import AddCampForm from './addCamp';
import { useNavigate } from 'react-router-dom';



export default function Camps() {

    const [camps, setCamps] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

 
    const fetchCamps = async function () {
        
           const response = await getCamps(page, limit);
                  setCamps(response.data);
                  setTotalPages(response.totalPages);
    }

    useEffect(() => {
        fetchCamps(page, limit);
    }, [page, limit]);

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
          const handleEditClick = (id) => {
            navigate(`/main/editCamp/${id}`);
        };

        const handleNextPage = () => {
            if (page < totalPages) {
              setPage(page + 1);
            }
          };
        
          const handlePreviousPage = () => {
            if (page > 1) {
              setPage(page - 1);
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
                                <i className="material-icons" onClick={() => handleEditClick(camp.Id)} >edit</i>

                                <i className="material-icons"  onClick={() => handleDeleteClick(camp.Id)} >delete</i>
                            </div></td>
                    </tr>
                ))}
            </tbody>

</table>
   <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
);
}
