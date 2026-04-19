export const environment = {
  production: true,
  apiBaseUrl: '/api',
  stripePublishableKey: '',
  requireEmailVerifiedForPurchase: true,
  stripeMode: 'stub' as 'stub' | 'real',
  staticBff: {
    enabled: true,
    seedUrl: 'assets/api/db.json',
    storageKey: 'lk_static_bff_state_v1',
    simulatedLatencyMs: 80
  }
};
