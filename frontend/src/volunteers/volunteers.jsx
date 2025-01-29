import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getVolunteers,deleteVolunteer} from '../services/volunteerService';
import styles from './volunteer.module.css';
import AddVolunteerForm from './addVolunteer';
import { useNavigate } from 'react-router-dom';

export default function Volunteers() {
    const [volunteers, setVolunteers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const fetchVolunteers = async function () {
        const volunteers = await getVolunteers();
        setVolunteers(volunteers);
    }

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const handleAddClick = () => {
        setShowForm(true);
    }
     const handleDeleteClick = async (Id) => {
            if (window.confirm("Are you sure you want to delete this order?")) {
              try {
                var result = await deleteVolunteer(Id);
                alert(result.message);
                fetchVolunteers();
              } catch (error) {
                
                alert(error.message);
              }
            }
          };
    
          const handleEditClick = (Id) => {
            navigate(`/main/editVolunteer/${Id}`);
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
        </div>
    );
}