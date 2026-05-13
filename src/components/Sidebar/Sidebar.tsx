import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Bot,
  FlaskConical,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hexagon,
  TrendingUp,
} from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import styles from './Sidebar.module.css';

const navSections = [
  {
    title: 'Main',
    items: [
      { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/ai-chat', icon: Bot, label: 'AI Assistant' },
      { path: '/analytics', icon: FlaskConical, label: 'Analytics Lab' },
      { path: '/funnel', icon: TrendingUp, label: 'Marketing Funnel' },
      { path: '/monitor', icon: Activity, label: 'System Monitor' },
    ],
  },
  {
    title: 'System',
    items: [
      { path: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      {/* Logo */}
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>
          <Hexagon />
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>Agentic BI</span>
          <span className={styles.logoSubtitle}>Data Command Center</span>
        </div>
      </div>

      {/* Collapse button */}
      <button className={styles.collapseBtn} onClick={toggleSidebar}>
        {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className={styles.nav}>
        {navSections.map((section) => (
          <div key={section.title} className={styles.navSection}>
            <div className={styles.navSectionTitle}>{section.title}</div>
            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                  onClick={() => navigate(item.path)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <item.icon className={styles.navIcon} size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={styles.navLabel}>{item.label}</span>
                  {sidebarCollapsed && <div className={styles.tooltip}>{item.label}</div>}
                </motion.button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className={styles.userCard}>
        <div className={styles.userAvatar}>AD</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Admin User</div>
          <div className={styles.userRole}>Data Analyst</div>
        </div>
      </div>
    </motion.aside>
  );
}
