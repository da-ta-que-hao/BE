// System monitor types
export interface PipelineNode {
  id: string;
  name: string;
  type: 'source' | 'stream' | 'process' | 'storage' | 'warehouse';
  status: 'healthy' | 'warning' | 'error';
  metric: string;
  metricValue: string;
  icon: string;
}

export interface PipelineEdge {
  from: string;
  to: string;
  throughput: string;
}

export interface LiveEvent {
  id: string;
  timestamp: string;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  data: string;
}

export interface ServiceInfo {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  cpu: number;
  memory: number;
  uptime: string;
  port?: number;
}

export interface MetricPoint {
  time: string;
  value: number;
}

export interface SystemMetric {
  name: string;
  unit: string;
  current: number;
  data: MetricPoint[];
}
