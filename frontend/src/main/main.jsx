import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './main.module.css';
import {Role} from '../enums/Role';

function Main() {
  const userRole = parseInt(localStorage.getItem('role'), 10);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <div className={styles.Main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">DONATENOW</Link></div>
       
         
        <div className={styles.profile} onClick={toggleDropdown}>
          <div><Link to="/our-needs" >WishList</Link></div>
          <img src="../photos/dave.jpg" alt="Profile Picture" />
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/main/change-password">Change Password</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

      </header>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li><Link to="/main/dashboard">Dashboard</Link></li>
              {
                userRole === Role["Normal User"] && (
                  <>
                    <li><Link to="/main/orders">Orders</Link></li>
                  </>
                )
              }
              {
                userRole === Role["Camp Admin"] && (
                  <>
                    <li><Link to="/main/orders">Orders</Link></li>
                    <li><Link to="/main/users">Users</Link></li>
                    <li><Link to="/main/requirements">Requirements</Link></li>
                    <li><Link to="/main/items">Items</Link></li>
                  </>
                )
              }
              {
                userRole === Role["Volunteer"] && (
                  <>
                    <li><Link to="/main/orders">Orders</Link></li>
                  </>
                )
              }
              {userRole == Role.Master && (
                <>
                  <li><Link to="/main/users">Users</Link></li>
                  <li><Link to="/main/requirements">Requirements</Link></li>
                  <li><Link to="/main/camps">Camps</Link></li>
                  <li><Link to="/main/items">Items</Link></li>
                  <li><Link to="/main/volunteers">Volunteers</Link></li>
                  <li><Link to="/main/orders">Orders</Link></li>
                </>
              )}
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Main;