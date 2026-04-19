import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CheckoutSessionStart } from './checkout.models';

@Injectable({ providedIn: 'root' })
export class StripeService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  startCheckout(orderId: string): Observable<CheckoutSessionStart> {
    return this.http.post<CheckoutSessionStart>(`${this.base}/checkout/session`, { orderId });
  }

  simulateWebhook(sessionId: string, action: 'complete' | 'cancel' = 'complete'): Observable<{ ok: true; status: string; enrollmentId?: string }> {
    return this.http.post<{ ok: true; status: string; enrollmentId?: string }>(`${this.base}/__sim/stripe-webhook`, { sessionId, action });
  }
}
