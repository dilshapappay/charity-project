
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './item.module.css';
import AddItemForm from './addItem';
import { getItems, deleteItem } from '../services/itemService';
import { useNavigate } from 'react-router-dom';


export default function Items() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchItems = async function () {
    const response = await getItems(page, limit);
    setItems(response.data);
    setTotalPages(response.totalPages);
  }

  useEffect(() => {
    fetchItems(page, limit);
  }, [page, limit]);

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
          {items.length == 0 && (
            <tr>
              <td colSpan={4} className='no-data-table'>No data found!!!</td>
            </tr>
          )}
          {items.length > 0 && items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>

              <td>
                <div className={styles.actionIcons}>
                  <i className="material-icons" onClick={() => handleEditClick(item.id)}>edit</i>
                  <i className="material-icons"
                    onClick={() => handleDeleteClick(item.id)} >delete</i>
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

