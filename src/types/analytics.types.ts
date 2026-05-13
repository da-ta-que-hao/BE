// Analytics types
export interface CustomerSegment {
  id: number;
  label: string;
  color: string;
  count: number;
  avgRecency: number;
  avgFrequency: number;
  avgMonetary: number;
  points: { x: number; y: number; z: number }[];
}

export interface RFMScore {
  recency: number;
  frequency: number;
  monetary: number;
  segment: string;
}

export interface AssociationRule {
  source: string;
  target: string;
  support: number;
  confidence: number;
  lift: number;
}

export interface PredictionInput {
  shippingCost: number;
  deliveryDays: number;
  category: string;
  paymentMethod: string;
}

export interface PredictionResult {
  rating: number;
  probability: number;
  factors: { name: string; impact: number; direction: 'positive' | 'negative' }[];
}
