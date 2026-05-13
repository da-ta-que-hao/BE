import { Calendar } from 'lucide-react';
import KPICard from '../../components/KPICard/KPICard';
import RevenueTrend from '../../components/RevenueTrend/RevenueTrend';
import OrderSankey from '../../components/OrderSankey/OrderSankey';
import TopProducts from '../../components/TopProducts/TopProducts';
import RecentOrders from '../../components/RecentOrders/RecentOrders';
import { kpiData } from '../../data/mockData';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Executive Dashboard</h1>
          <p className={styles.subtitle}>Real-time overview of Olist E-commerce platform</p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem',
          fontSize: 'var(--text-sm)', color: 'var(--text-secondary)'
        }}>
          <Calendar size={14} /> Jan 2024 — Dec 2024
        </div>
      </div>

      <div className={styles.kpiGrid}>
        {kpiData.map((kpi, i) => (
          <KPICard key={kpi.id} data={kpi} index={i} />
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <RevenueTrend />
        <OrderSankey />
      </div>

      <TopProducts />
      <RecentOrders />
    </div>
  );
}
