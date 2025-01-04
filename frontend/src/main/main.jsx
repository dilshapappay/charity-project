import { Outlet, Link } from 'react-router-dom';
import styles from './main.module.css';

function Main() {
  return (
    <div className={styles.Main}>
      <header className={styles.header}>
        <h1>My Application</h1>
      </header>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li><Link to="/main/users">Users</Link></li>
              <li><Link to="/main/requirements">Requirements</Link></li>
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