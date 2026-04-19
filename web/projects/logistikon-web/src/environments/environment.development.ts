export const environment = {
  production: false,
  apiBaseUrl: '/api',
  stripePublishableKey: '',
  requireEmailVerifiedForPurchase: false,
  stripeMode: 'stub' as 'stub' | 'real',
  staticBff: {
    enabled: true,
    seedUrl: 'assets/api/db.json',
    storageKey: 'lk_static_bff_state_v1_dev',
    simulatedLatencyMs: 120
  }
};
