import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getVolunteers,deleteVolunteer} from '../services/volunteerService';
import styles from './volunteer.module.css';
import AddVolunteerForm from './addVolunteer';
import { useNavigate } from 'react-router-dom';

export default function Volunteers() {
    const [volunteers, setVolunteers] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const fetchVolunteers = async function () {
        const response = await getVolunteers(page, limit);
        setVolunteers(response.data);
        setTotalPages(response.totalPages);
    }

    useEffect(() => {
        fetchVolunteers(page, limit);
    }, [page, limit]);

    const handleAddClick = () => {
        setShowForm(true);
    }
     const handleDeleteClick = async (id) => {
            if (window.confirm("Are you sure you want to delete this order?")) {
              try {
                var result = await deleteVolunteer(id);
                alert(result.message);
                fetchVolunteers();
              } catch (error) {
                
                alert(error.message);
              }
            }
          };
    
          const handleEditClick = (id) => {
            navigate(`/main/editVolunteer/${id}`);
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
            <h2>Volunteer Details</h2>
            <Link to="/main/addVolunteer">
                <button className={styles.addButton} onClick={handleAddClick}>+Add</button>
                {showForm && <AddVolunteerForm />}
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Sl</th>
                        <th>Volunteer Name</th>
                        <th>Camp Name</th>
                         <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteers.map((volunteer, index) => (
                        <tr key={volunteer.id}>
                            <td>{index + 1}</td>
                            <td> {`${volunteer.FirstName} ${volunteer.LastName}`}</td>
                            <td>{volunteer.CampName}</td>
                           
                            <td>
                                <div className={styles.actionIcons}>
                                    <i className="material-icons"  onClick={() => handleEditClick(volunteer.Id)}>edit</i>
                                    <i className="material-icons" onClick={() => handleDeleteClick(volunteer.Id)}
                                    >delete</i>
                                </div>
                            </td>
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