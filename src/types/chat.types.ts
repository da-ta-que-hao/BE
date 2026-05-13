// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  sqlQuery?: string;
  chartData?: ChartResult | null;
  tableData?: TableResult | null;
  thoughtProcess?: ThoughtStep[];
}

export interface ThoughtStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'done' | 'error';
  detail?: string;
}

export interface ChartResult {
  type: 'bar' | 'line' | 'pie' | 'scatter';
  title: string;
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
}

export interface TableResult {
  columns: string[];
  rows: Record<string, unknown>[];
}

export interface QuickAction {
  id: string;
  icon: string;
  label: string;
  query: string;
}
