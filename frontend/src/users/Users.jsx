import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { Link } from "react-router-dom";

import styles from "./users.module.css";
import AddUserForm from "./addUser";

import { useNavigate } from "react-router-dom";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();


  const fetchUsers = async function () {
    const users = await getUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddClick = () => {
    setShowForm(true);
  };
  const handleDeleteClick = async (Id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        var result = await deleteUser(Id);
        alert(result.message);
        fetchUsers();
      } catch (error) {
        debugger
        alert(error.message);
      }
    }
  };

  const handleEditClick = (id) => {
    navigate(`/main/editUser/${id}`);
};
  return (
    <div className={styles.tableContainer}>
      <h2>User Details</h2>
      <Link to="/main/addUser">
        <button className={styles.addButton} onClick={handleAddClick}>
          +Add
        </button>
        {showForm && <AddUserForm />}
      </Link>

      <table>
        <thead>
          <tr>
            <th>Sl</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.Id}>
              <td>{index + 1}</td>
              <td>{`${user.FirstName} ${user.LastName}`}</td>
              <td>{user.Email}</td>
              <td>{user.Password}</td>
              <td>{user.RoleName}</td>
              <td>{user.Address}</td>
              <td>
                {" "}
                <div className={styles.actionIcons}>
                  <i className="material-icons" onClick={() => handleEditClick(user.Id)}>edit</i>

                  <i
                    className="material-icons"
                    onClick={() => handleDeleteClick(user.Id)}
                  >
                    delete
                  </i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
