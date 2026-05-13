import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronRight } from 'lucide-react';
import styles from './Header.module.css';

const pageNames: Record<string, string> = {
  '/': 'Executive Dashboard',
  '/ai-chat': 'AI Assistant',
  '/analytics': 'Analytics Lab',
  '/monitor': 'System Monitor',
  '/settings': 'Settings',
};

export default function Header() {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || 'Dashboard';

  return (
    <header className={styles.header} id="main-header">
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Agentic BI</span>
        <ChevronRight size={12} className={styles.breadcrumbSep} />
        <span className={styles.breadcrumbCurrent}>{pageName}</span>
      </div>

      {/* Search */}
      <div className={styles.searchBar}>
        <Search size={16} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search anything..."
          type="text"
          id="global-search"
        />
        <span className={styles.searchShortcut}>⌘K</span>
      </div>

      {/* Right actions */}
      <div className={styles.actions}>
        <div className={styles.liveIndicator}>
          <span className={styles.liveDot} />
          LIVE
        </div>

        <div className={styles.divider} />

        <button className={styles.actionBtn} id="notifications-btn">
          <Bell size={18} />
          <span className={styles.badge} />
        </button>

        <div className={styles.divider} />

        <button className={styles.userBtn} id="user-menu-btn">
          <div className={styles.headerAvatar}>AD</div>
          <span className={styles.headerUserName}>Admin</span>
        </button>
      </div>
    </header>
  );
}
