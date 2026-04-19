import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateOrderPayload, Order } from './checkout.models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  create(payload: CreateOrderPayload): Observable<Order> {
    return this.http.post<Order>(`${this.base}/orders`, payload);
  }

  get(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.base}/orders/${id}`);
  }
}
