import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { useUIStore } from '../stores/uiStore';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={`${styles.main} ${sidebarCollapsed ? styles.collapsed : ''}`}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
