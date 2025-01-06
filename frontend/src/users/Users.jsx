import { useEffect, useState } from 'react';
import { getUsers } from "../services/userService";
import styles from './users.module.css';


export default function Users() {

    const [users, setUsers] = useState([]);
    const fetchUsers = async function () {
        
            const users = await getUsers();
            setUsers(users);
        
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div className={styles.tableContainer}>
                <h2>User Details</h2>
                <button className={styles.addButton}>+Add</button>
                <table>
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{`${user.FirstName} ${user.LastName}`}</td>
                            <td>{user.Email}</td>
                            <td>{user.RoleName}</td>
                            <td>{user.Address}</td>
                            <td>  <div className={styles.actionIcons}>
                                    <i className="material-icons" >edit</i>

                                    <i className="material-icons" >delete</i>
                                </div></td>
                        </tr>
                    ))}
                </tbody>

</table>
        </div>
    );
}