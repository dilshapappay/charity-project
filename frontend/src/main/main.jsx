import { Outlet, Link } from 'react-router-dom';
import styles from './main.module.css';

function Main() {
  return (
    <div className={styles.Main}>
      <header className={styles.header}>
        <div className={styles.logo}>DONATENOW</div>
                        <div className={styles.searchBar}>
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Search" />
                        </div>
                        <div className={styles.profile}>
                    <img src="../photos/dave.jpg" alt="Profile Picture"/>
                </div>
      </header>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li><Link to="/main/users">Users</Link></li>
              <li><Link to="/main/requirements">Requirements</Link></li>
              <li><Link to="/main/camps">Camps</Link></li>
              <li><Link to="/main/items">Items</Link></li>
              <li><Link to="/main/volunteers">Volunteers</Link></li>
              <li><Link to="/main/orders">Orders</Link></li>


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