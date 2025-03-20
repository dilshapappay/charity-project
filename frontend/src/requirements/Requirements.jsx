import { useEffect, useState } from "react";
import {
  getRequirements,
  deleteRequirement,
} from "../services/requirementService";
import styles from "./Requirement.module.css";
import { Link } from "react-router-dom";
import AddRequirementForm from "./addRequirement";
import { useNavigate } from "react-router-dom";
import OrderStatus from "../orderStatus";

export default function Requirements() {
  const [requirements, setRequirements] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchRequirements = async () => {
    const response = await getRequirements("", "", page, limit);
    console.log(response);
    setRequirements(response.data);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    fetchRequirements(page, limit);
  }, [page, limit]);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleDeleteClick = async (Id) => {
    if (window.confirm("Are you sure you want to delete this requirement?")) {
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
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requirements.length == 0 && (
            <tr>
              <td colSpan={8} className='no-data-table'>No data found!!!</td>
            </tr>
          )}

          {requirements.length > 0 && requirements.map((requirement, index) => (
            <tr key={requirement.id}>
              <td>{index + 1}</td>
              <td>{requirement.Name}</td>
              <td>{requirement.Description}</td>
              <td>{requirement.District}</td>
              <td>{OrderStatus[Number(requirement.StatusId)]}</td>
              <td>{requirement.RequiredQuantity}</td>
              <td>{requirement.AchievedQuantity}</td>
              <td>
                <img
                  src={requirement.ImageURL}
                  alt=""
                  className={styles.images}
                />
              </td>

              <td>
                <div className={styles.actionIcons}>
                  <i
                    className="material-icons"
                    onClick={() => handleEditClick(requirement.Id)}
                  >
                    edit
                  </i>

                  <i
                    className="material-icons"
                    onClick={() => handleDeleteClick(requirement.Id)}
                  >
                    delete
                  </i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
