export interface FunnelKPI {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  format: 'number' | 'percent' | 'currency' | 'days';
  trend: 'up' | 'down';
  trendPercent: number;
  color: string;
}

export interface FunnelStage {
  stage: string;
  count: number;
  rate: number; // conversion rate from previous stage
  color: string;
}

export interface LeadOrigin {
  origin: string;
  leads: number;
  deals: number;
  conversionRate: number;
  avgDealValue: number;
  color: string;
}

export interface FunnelTrendPoint {
  month: string;
  leads: number;
  deals: number;
  conversionRate: number;
}

export interface BusinessSegment {
  segment: string;
  deals: number;
  revenue: number;
  avgDealValue: number;
  avgLeadTime: number; // days from lead to close
}
