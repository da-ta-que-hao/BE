// Dashboard types
export interface KPIData {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  format: 'currency' | 'percent' | 'number' | 'rating';
  trend: 'up' | 'down' | 'neutral';
  trendPercent: number;
  sparklineData: number[];
  color: string;
  icon: string;
}

export interface RevenueByState {
  state: string;
  stateCode: string;
  revenue: number;
  orders: number;
}

export interface OrderFlow {
  source: string;
  target: string;
  value: number;
}

export interface RevenueTrendPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  category: string;
  revenue: number;
  orders: number;
  growth: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  date: string;
  city: string;
}
