import { useEffect, useState } from "react";
import { getRequirements,deleteRequirement} from "../services/requirementService";
import styles from "./Requirement.module.css";
import { Link } from "react-router-dom";
import AddRequirementForm from "./addRequirement";
import { useNavigate } from "react-router-dom";


export default function Requirements() {
  const [requirements, setRequirements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();


  const fetchRequirements = async () => {
    const requirements = await getRequirements();
    setRequirements(requirements);
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const handleAddClick = () => {
    setShowForm(true);
  };

   const handleDeleteClick = async (Id) => {
          if (window.confirm("Are you sure you want to delete this order?")) {
            try {
              var result = await deleteRequirement(Id);
              alert(result.message);
              fetchRequirements();
            } catch (error) {
              
              alert(error.message);
            }
          }
        };
        const handleEditClick = (id) => {
          navigate(`/main/editRequirement/${id}`);
      };
    
      
  return (
    <div className={styles.tableContainer}>
      <h2>Requirement Details</h2>
      <Link to="/main/addRequirement">
        <button className={styles.addButton} onClick={handleAddClick}>
          +Add
        </button>
        {showForm && <AddRequirementForm />}
      </Link>
      <table>
        <thead>
          <tr>
            <th>Sl</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>District</th>
            <th>Status</th>
            <th>Required Quantity</th>
            <th>Achieved Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((requirement, index) => (
            <tr key={requirement.id}>
              <td>{index + 1}</td>
              <td>{requirement.Name}</td>
              <td>{requirement.Description}</td>
              <td>{requirement.District}</td>
              <td>{requirement.Status}</td>
              <td>{requirement.RequiredQuantity}</td>
              <td>{requirement.AchievedQuantity}</td>

              <td>
              
                <div className={styles.actionIcons}>
                  <i className="material-icons"onClick={() => handleEditClick(requirement.Id)} >edit</i>

                  <i className="material-icons" onClick={() => handleDeleteClick(requirement.Id)} >delete</i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};