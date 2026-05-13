import { motion } from 'framer-motion';
import { recentOrders } from '../../data/mockData';
import styles from './RecentOrders.module.css';

const statusClassMap: Record<string, string> = {
  delivered: styles.statusDelivered,
  shipped: styles.statusShipped,
  processing: styles.statusProcessing,
  cancelled: styles.statusCancelled,
};

export default function RecentOrders() {
  return (
    <motion.div
      className={styles.tableWrap}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3 className={styles.tableTitle}>Recent Orders</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>City</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order, i) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.05 }}
            >
              <td><span className={styles.orderId}>{order.id}</span></td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td><span className={styles.amount}>R$ {order.amount.toFixed(2)}</span></td>
              <td>
                <span className={`${styles.status} ${statusClassMap[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.city}</td>
              <td>{order.date}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
