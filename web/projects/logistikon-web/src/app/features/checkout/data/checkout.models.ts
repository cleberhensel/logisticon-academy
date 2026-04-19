export interface Order {
  id: string;
  userId: string;
  trailId: string;
  trailSlug: string;
  trailTitle: string;
  amountCents: number;
  currency: string;
  status: 'pending_payment' | 'paid' | 'failed' | 'cancelled' | 'expired';
  createdAt: string;
  paidAt?: string;
}

export interface CheckoutSessionStart {
  sessionId: string;
  url: string;
  mode: 'stub' | 'real';
}

export interface CreateOrderPayload {
  trailId?: string;
  trailSlug?: string;
}
