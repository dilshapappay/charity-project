
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './item.module.css';
import AddItemForm from './addItem';
import { getItems,deleteItem } from '../services/itemService';
import { useNavigate } from 'react-router-dom';


export default function Items() {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const fetchItems = async function () {
        const items = await getItems();
        setItems(items);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const handleAddClick = () => {
        setShowForm(true);
    }
const handleDeleteClick = async (Id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
          try {
            var result = await deleteItem(Id);
            alert(result.message);
            fetchItems();
          } catch (error) {
            
            alert(error.message);
          }
        }
      };

      const handleEditClick = (id) => {
        navigate(`/main/editItem/${id}`);
    };

    return (
        <div className={styles.tableContainer}>
            <h2>Item Details</h2>
            <Link to="/main/addItem">
                <button className={styles.addButton} onClick={handleAddClick}>+Add</button>
                {showForm && <AddItemForm />}
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Sl</th>
                        <th>Item Name</th>
                        <th>Item Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>
                                <div className={styles.actionIcons}>
                                    <i className="material-icons"  onClick={() => handleEditClick(item.Id)}>edit</i>
                                    <i className="material-icons" 
                                    onClick={() => handleDeleteClick(item.Id)} >delete</i>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

