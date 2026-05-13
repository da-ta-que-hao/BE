import type { KPIData, RevenueTrendPoint, TopProduct, RecentOrder, OrderFlow } from '../types/dashboard.types';
import type { ChatMessage, QuickAction } from '../types/chat.types';
import type { CustomerSegment, AssociationRule } from '../types/analytics.types';
import type { PipelineNode, LiveEvent, ServiceInfo, SystemMetric } from '../types/monitor.types';
import type { FunnelKPI, FunnelStage, LeadOrigin, FunnelTrendPoint, BusinessSegment } from '../types/funnel.types';

// ===================== DASHBOARD DATA =====================
export const kpiData: KPIData[] = [
  {
    id: 'gmv',
    label: 'GMV (Total Revenue)',
    value: 13591643,
    previousValue: 12150890,
    format: 'currency',
    trend: 'up',
    trendPercent: 11.85,
    sparklineData: [65, 72, 68, 80, 78, 85, 90, 88, 95, 92, 98, 100],
    color: '#1428a0',
    icon: 'dollar-sign',
  },
  {
    id: 'aov',
    label: 'AOV (Avg Order Value)',
    value: 154.32,
    previousValue: 148.67,
    format: 'currency',
    trend: 'up',
    trendPercent: 3.8,
    sparklineData: [40, 42, 45, 43, 48, 47, 50, 49, 52, 51, 53, 54],
    color: '#2189ff',
    icon: 'shopping-cart',
  },
  {
    id: 'late-delivery',
    label: 'Late Delivery Rate',
    value: 6.74,
    previousValue: 8.12,
    format: 'percent',
    trend: 'down',
    trendPercent: -17.0,
    sparklineData: [12, 11, 10, 9.5, 9, 8.5, 8, 7.8, 7.5, 7.2, 7, 6.74],
    color: '#00a76f',
    icon: 'truck',
  },
  {
    id: 'nps',
    label: 'NPS Score (Avg Rating)',
    value: 4.09,
    previousValue: 3.95,
    format: 'rating',
    trend: 'up',
    trendPercent: 3.54,
    sparklineData: [3.8, 3.82, 3.85, 3.9, 3.88, 3.95, 3.98, 4.0, 4.02, 4.05, 4.07, 4.09],
    color: '#f5a623',
    icon: 'star',
  },
];

export const revenueTrendData: RevenueTrendPoint[] = [
  { date: '2024-01', revenue: 854230, orders: 5540 },
  { date: '2024-02', revenue: 923410, orders: 6120 },
  { date: '2024-03', revenue: 1087650, orders: 7230 },
  { date: '2024-04', revenue: 998740, orders: 6670 },
  { date: '2024-05', revenue: 1154320, orders: 7680 },
  { date: '2024-06', revenue: 1243890, orders: 8340 },
  { date: '2024-07', revenue: 1098760, orders: 7410 },
  { date: '2024-08', revenue: 1367890, orders: 9120 },
  { date: '2024-09', revenue: 1289450, orders: 8650 },
  { date: '2024-10', revenue: 1432100, orders: 9560 },
  { date: '2024-11', revenue: 1587640, orders: 10640 },
  { date: '2024-12', revenue: 1653560, orders: 11050 },
];

export const topProducts: TopProduct[] = [
  { category: 'Bed & Bath', revenue: 2345670, orders: 15430, growth: 12.5 },
  { category: 'Health & Beauty', revenue: 1987340, orders: 13280, growth: 8.3 },
  { category: 'Sports & Leisure', revenue: 1654890, orders: 11050, growth: 15.2 },
  { category: 'Furniture & Decor', revenue: 1432780, orders: 9560, growth: -2.1 },
  { category: 'Computers & Acc.', revenue: 1289430, orders: 8610, growth: 22.7 },
  { category: 'Housewares', revenue: 1098760, orders: 7340, growth: 5.8 },
  { category: 'Watches & Gifts', revenue: 987650, orders: 6590, growth: 18.4 },
  { category: 'Telephony', revenue: 876540, orders: 5840, growth: -5.3 },
  { category: 'Garden Tools', revenue: 765430, orders: 5110, growth: 9.6 },
  { category: 'Auto & Industry', revenue: 654320, orders: 4370, growth: 3.2 },
];

export const orderFlowData: OrderFlow[] = [
  { source: 'Created', target: 'Approved', value: 99441 },
  { source: 'Approved', target: 'Shipped', value: 97503 },
  { source: 'Shipped', target: 'Delivered', value: 96478 },
  { source: 'Shipped', target: 'Late Delivery', value: 6508 },
  { source: 'Created', target: 'Cancelled', value: 625 },
  { source: 'Approved', target: 'Unavailable', value: 609 },
];

export const recentOrders: RecentOrder[] = [
  { id: 'ORD-78432', customer: 'Maria Silva', product: 'Bed Linen Set', amount: 234.50, status: 'delivered', date: '2024-12-15 14:32', city: 'São Paulo' },
  { id: 'ORD-78433', customer: 'João Santos', product: 'Wireless Earbuds', amount: 89.90, status: 'shipped', date: '2024-12-15 14:28', city: 'Rio de Janeiro' },
  { id: 'ORD-78434', customer: 'Ana Costa', product: 'Yoga Mat Pro', amount: 156.00, status: 'processing', date: '2024-12-15 14:15', city: 'Belo Horizonte' },
  { id: 'ORD-78435', customer: 'Carlos Lima', product: 'Kitchen Blender', amount: 312.80, status: 'delivered', date: '2024-12-15 13:58', city: 'Curitiba' },
  { id: 'ORD-78436', customer: 'Lucia Mendes', product: 'Smart Watch X5', amount: 599.99, status: 'cancelled', date: '2024-12-15 13:42', city: 'Brasília' },
  { id: 'ORD-78437', customer: 'Pedro Rocha', product: 'Office Chair', amount: 478.00, status: 'shipped', date: '2024-12-15 13:30', city: 'Salvador' },
  { id: 'ORD-78438', customer: 'Fernanda Alves', product: 'Running Shoes', amount: 245.90, status: 'delivered', date: '2024-12-15 13:15', city: 'Fortaleza' },
  { id: 'ORD-78439', customer: 'Ricardo Nunes', product: 'Laptop Stand', amount: 167.50, status: 'processing', date: '2024-12-15 13:02', city: 'Porto Alegre' },
];

// ===================== CHAT DATA =====================
export const quickActions: QuickAction[] = [
  { id: '1', icon: '📈', label: 'Doanh thu tháng này vs tháng trước?', query: 'So sánh doanh thu tháng này với tháng trước' },
  { id: '2', icon: '👥', label: 'Phân tích nhóm khách hàng rời bỏ', query: 'Phân tích nhóm khách hàng có nguy cơ rời bỏ cao nhất' },
  { id: '3', icon: '🛒', label: 'Sản phẩm bán kèm đồ gia dụng?', query: 'Sản phẩm nào thường được mua kèm với đồ gia dụng?' },
  { id: '4', icon: '📦', label: 'Tỷ lệ giao hàng trễ tuần này?', query: 'Tỷ lệ giao hàng trễ trong tuần này là bao nhiêu?' },
  { id: '5', icon: '🏆', label: 'Top 5 bang doanh thu cao nhất', query: 'Top 5 bang có doanh thu cao nhất' },
  { id: '6', icon: '⭐', label: 'Phân tích đánh giá khách hàng', query: 'Phân tích xu hướng đánh giá của khách hàng theo thời gian' },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Xin chào! 👋 Tôi là **AI Assistant** của hệ thống Agentic BI. Tôi có thể giúp bạn phân tích dữ liệu kinh doanh, truy vấn database và tạo báo cáo tự động.\n\nBạn có thể hỏi tôi bất cứ điều gì về dữ liệu sàn TMĐT Olist, ví dụ:\n- Doanh thu theo khu vực\n- Phân tích khách hàng\n- Hiệu suất giao hàng\n\nHãy bắt đầu nào! 🚀',
    timestamp: new Date(),
  },
];

// ===================== ANALYTICS DATA =====================
export const customerSegments: CustomerSegment[] = [
  {
    id: 0,
    label: 'VIP Champions',
    color: '#34d399',
    count: 1247,
    avgRecency: 12,
    avgFrequency: 8.5,
    avgMonetary: 856.30,
    points: Array.from({ length: 30 }, () => ({
      x: 70 + Math.random() * 30,
      y: 70 + Math.random() * 30,
      z: 500 + Math.random() * 800,
    })),
  },
  {
    id: 1,
    label: 'Potential Loyalists',
    color: '#06b6d4',
    count: 3458,
    avgRecency: 35,
    avgFrequency: 4.2,
    avgMonetary: 342.50,
    points: Array.from({ length: 30 }, () => ({
      x: 40 + Math.random() * 35,
      y: 35 + Math.random() * 35,
      z: 200 + Math.random() * 400,
    })),
  },
  {
    id: 2,
    label: 'At Risk',
    color: '#fbbf24',
    count: 2156,
    avgRecency: 78,
    avgFrequency: 2.1,
    avgMonetary: 198.70,
    points: Array.from({ length: 30 }, () => ({
      x: 15 + Math.random() * 30,
      y: 15 + Math.random() * 30,
      z: 100 + Math.random() * 300,
    })),
  },
  {
    id: 3,
    label: 'Lost / Hibernating',
    color: '#fb7185',
    count: 1834,
    avgRecency: 145,
    avgFrequency: 1.2,
    avgMonetary: 87.40,
    points: Array.from({ length: 30 }, () => ({
      x: 2 + Math.random() * 20,
      y: 2 + Math.random() * 15,
      z: 30 + Math.random() * 150,
    })),
  },
];

export const associationRules: AssociationRule[] = [
  { source: 'Bed & Bath', target: 'Health & Beauty', support: 0.045, confidence: 0.72, lift: 3.2 },
  { source: 'Housewares', target: 'Furniture & Decor', support: 0.038, confidence: 0.65, lift: 2.8 },
  { source: 'Sports & Leisure', target: 'Health & Beauty', support: 0.032, confidence: 0.58, lift: 2.5 },
  { source: 'Computers', target: 'Telephony', support: 0.028, confidence: 0.54, lift: 2.3 },
  { source: 'Watches & Gifts', target: 'Bed & Bath', support: 0.025, confidence: 0.48, lift: 2.1 },
  { source: 'Garden Tools', target: 'Housewares', support: 0.022, confidence: 0.44, lift: 1.9 },
  { source: 'Auto & Industry', target: 'Garden Tools', support: 0.018, confidence: 0.38, lift: 1.7 },
  { source: 'Telephony', target: 'Watches & Gifts', support: 0.015, confidence: 0.35, lift: 1.5 },
];

// ===================== MONITOR DATA =====================
export const pipelineNodes: PipelineNode[] = [
  { id: 'postgres', name: 'PostgreSQL', type: 'source', status: 'healthy', metric: 'Records', metricValue: '99.4K', icon: 'database' },
  { id: 'debezium', name: 'Debezium CDC', type: 'stream', status: 'healthy', metric: 'Lag', metricValue: '< 1s', icon: 'radio' },
  { id: 'kafka', name: 'Kafka', type: 'stream', status: 'healthy', metric: 'Topics', metricValue: '12', icon: 'activity' },
  { id: 'spark', name: 'Apache Spark', type: 'process', status: 'warning', metric: 'Jobs', metricValue: '3 running', icon: 'zap' },
  { id: 'delta', name: 'Delta Lake', type: 'storage', status: 'healthy', metric: 'Tables', metricValue: '24', icon: 'layers' },
  { id: 'clickhouse', name: 'ClickHouse', type: 'warehouse', status: 'healthy', metric: 'QPS', metricValue: '1.2K', icon: 'server' },
];

export const generateLiveEvents = (): LiveEvent[] => {
  const tables = ['orders', 'order_items', 'customers', 'payments', 'reviews'];
  const types: Array<'INSERT' | 'UPDATE' | 'DELETE'> = ['INSERT', 'UPDATE', 'DELETE'];
  return Array.from({ length: 20 }, (_, i) => ({
    id: `evt-${Date.now()}-${i}`,
    timestamp: new Date(Date.now() - i * 2000).toISOString(),
    eventType: types[Math.floor(Math.random() * 3)],
    table: tables[Math.floor(Math.random() * tables.length)],
    data: `{id: ${10000 + Math.floor(Math.random() * 90000)}, ...}`,
  }));
};

export const services: ServiceInfo[] = [
  { id: 'postgres', name: 'PostgreSQL', status: 'running', cpu: 12.3, memory: 45.2, uptime: '14d 6h', port: 5432 },
  { id: 'kafka', name: 'Kafka Broker', status: 'running', cpu: 8.7, memory: 62.1, uptime: '14d 6h', port: 9092 },
  { id: 'zookeeper', name: 'Zookeeper', status: 'running', cpu: 2.1, memory: 18.4, uptime: '14d 6h', port: 2181 },
  { id: 'debezium', name: 'Debezium', status: 'running', cpu: 5.4, memory: 34.8, uptime: '14d 5h', port: 8083 },
  { id: 'spark-master', name: 'Spark Master', status: 'running', cpu: 15.6, memory: 72.3, uptime: '13d 22h', port: 8080 },
  { id: 'spark-worker', name: 'Spark Worker', status: 'running', cpu: 45.2, memory: 78.9, uptime: '13d 22h', port: 8081 },
  { id: 'minio', name: 'MinIO', status: 'running', cpu: 3.8, memory: 28.7, uptime: '14d 6h', port: 9000 },
  { id: 'clickhouse', name: 'ClickHouse', status: 'running', cpu: 22.4, memory: 56.3, uptime: '14d 6h', port: 8123 },
  { id: 'airflow', name: 'Airflow', status: 'running', cpu: 7.9, memory: 41.5, uptime: '14d 4h', port: 8082 },
  { id: 'streamlit', name: 'Streamlit', status: 'stopped', cpu: 0, memory: 0, uptime: '-', port: 8501 },
  { id: 'fastapi', name: 'FastAPI', status: 'running', cpu: 4.2, memory: 22.6, uptime: '14d 6h', port: 8000 },
  { id: 'redis', name: 'Redis', status: 'running', cpu: 1.2, memory: 15.3, uptime: '14d 6h', port: 6379 },
  { id: 'chromadb', name: 'ChromaDB', status: 'running', cpu: 3.5, memory: 38.2, uptime: '12d 8h', port: 8001 },
  { id: 'nginx', name: 'Nginx Proxy', status: 'running', cpu: 0.8, memory: 8.4, uptime: '14d 6h', port: 80 },
  { id: 'grafana', name: 'Grafana', status: 'running', cpu: 2.6, memory: 19.7, uptime: '14d 6h', port: 3000 },
  { id: 'flink', name: 'Apache Flink', status: 'error', cpu: 0, memory: 0, uptime: '-', port: 8084 },
];

// ===================== MARKETING FUNNEL DATA =====================
export const funnelKPIs: FunnelKPI[] = [
  {
    id: 'total-leads',
    label: 'Total MQLs',
    value: 8000,
    previousValue: 6720,
    format: 'number',
    trend: 'up',
    trendPercent: 19.0,
    color: '#818cf8',
  },
  {
    id: 'conversion-rate',
    label: 'Lead → Deal Rate',
    value: 10.53,
    previousValue: 8.91,
    format: 'percent',
    trend: 'up',
    trendPercent: 18.2,
    color: '#34d399',
  },
  {
    id: 'cac',
    label: 'CAC (per Seller)',
    value: 312.40,
    previousValue: 378.90,
    format: 'currency',
    trend: 'down',
    trendPercent: -17.5,
    color: '#f97316',
  },
  {
    id: 'lead-velocity',
    label: 'Avg Lead-to-Close',
    value: 34.2,
    previousValue: 41.8,
    format: 'days',
    trend: 'down',
    trendPercent: -18.2,
    color: '#06b6d4',
  },
];

export const funnelStages: FunnelStage[] = [
  { stage: 'Leads Captured', count: 8000, rate: 100, color: '#818cf8' },
  { stage: 'MQL Qualified', count: 5632, rate: 70.4, color: '#06b6d4' },
  { stage: 'In Negotiation', count: 1843, rate: 32.7, color: '#fbbf24' },
  { stage: 'Deals Closed', count: 842, rate: 45.7, color: '#34d399' },
];

export const leadOrigins: LeadOrigin[] = [
  { origin: 'Organic Search', leads: 2640, deals: 312, conversionRate: 11.8, avgDealValue: 4230, color: '#818cf8' },
  { origin: 'Paid Search', leads: 1920, deals: 198, conversionRate: 10.3, avgDealValue: 3870, color: '#06b6d4' },
  { origin: 'Social Media', leads: 1280, deals: 124, conversionRate: 9.7, avgDealValue: 3540, color: '#34d399' },
  { origin: 'Email Campaign', leads: 960, deals: 104, conversionRate: 10.8, avgDealValue: 4680, color: '#fbbf24' },
  { origin: 'Referral', leads: 720, deals: 72, conversionRate: 10.0, avgDealValue: 5120, color: '#f97316' },
  { origin: 'Unknown', leads: 480, deals: 32, conversionRate: 6.7, avgDealValue: 2890, color: '#94a3b8' },
];

export const funnelTrend: FunnelTrendPoint[] = [
  { month: 'Jan', leads: 480, deals: 42, conversionRate: 8.75 },
  { month: 'Feb', leads: 520, deals: 48, conversionRate: 9.23 },
  { month: 'Mar', leads: 610, deals: 58, conversionRate: 9.51 },
  { month: 'Apr', leads: 580, deals: 56, conversionRate: 9.66 },
  { month: 'May', leads: 670, deals: 67, conversionRate: 10.0 },
  { month: 'Jun', leads: 720, deals: 74, conversionRate: 10.28 },
  { month: 'Jul', leads: 690, deals: 72, conversionRate: 10.43 },
  { month: 'Aug', leads: 780, deals: 83, conversionRate: 10.64 },
  { month: 'Sep', leads: 820, deals: 88, conversionRate: 10.73 },
  { month: 'Oct', leads: 870, deals: 94, conversionRate: 10.80 },
  { month: 'Nov', leads: 940, deals: 103, conversionRate: 10.96 },
  { month: 'Dec', leads: 1010, deals: 113, conversionRate: 11.19 },
];

export const businessSegments: BusinessSegment[] = [
  { segment: 'Fashion & Clothing', deals: 187, revenue: 892450, avgDealValue: 4772, avgLeadTime: 28 },
  { segment: 'Health & Beauty', deals: 156, revenue: 743200, avgDealValue: 4764, avgLeadTime: 31 },
  { segment: 'Home & Garden', deals: 134, revenue: 612800, avgDealValue: 4573, avgLeadTime: 35 },
  { segment: 'Electronics', deals: 98, revenue: 521400, avgDealValue: 5320, avgLeadTime: 42 },
  { segment: 'Food & Beverage', deals: 87, revenue: 347600, avgDealValue: 3995, avgLeadTime: 22 },
  { segment: 'Sports & Leisure', deals: 72, revenue: 324000, avgDealValue: 4500, avgLeadTime: 29 },
  { segment: 'Automotive', deals: 63, revenue: 382950, avgDealValue: 6078, avgLeadTime: 48 },
  { segment: 'Other', deals: 45, revenue: 180000, avgDealValue: 4000, avgLeadTime: 33 },
];

export const systemMetrics: SystemMetric[] = [
  {
    name: 'CPU Usage',
    unit: '%',
    current: 34.5,
    data: Array.from({ length: 60 }, (_, i) => ({
      time: new Date(Date.now() - (59 - i) * 5000).toISOString(),
      value: 25 + Math.random() * 25,
    })),
  },
  {
    name: 'Memory Usage',
    unit: '%',
    current: 58.2,
    data: Array.from({ length: 60 }, (_, i) => ({
      time: new Date(Date.now() - (59 - i) * 5000).toISOString(),
      value: 50 + Math.random() * 20,
    })),
  },
  {
    name: 'Kafka Consumer Lag',
    unit: 'msgs',
    current: 142,
    data: Array.from({ length: 60 }, (_, i) => ({
      time: new Date(Date.now() - (59 - i) * 5000).toISOString(),
      value: Math.floor(50 + Math.random() * 200),
    })),
  },
  {
    name: 'Throughput',
    unit: 'msg/s',
    current: 1247,
    data: Array.from({ length: 60 }, (_, i) => ({
      time: new Date(Date.now() - (59 - i) * 5000).toISOString(),
      value: Math.floor(800 + Math.random() * 800),
    })),
  },
];
