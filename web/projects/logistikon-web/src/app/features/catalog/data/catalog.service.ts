import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CatalogPage,
  CatalogTrailDetail,
  Eligibility
} from './catalog.models';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  list(page = 1, pageSize = 12): Observable<CatalogPage> {
    const params = new HttpParams()
      .set('status', 'published')
      .set('page', page)
      .set('pageSize', pageSize);
    return this.http.get<CatalogPage>(`${this.base}/trails`, { params });
  }

  detail(slug: string): Observable<CatalogTrailDetail> {
    return this.http.get<CatalogTrailDetail>(`${this.base}/trails/${slug}`);
  }

  eligibility(slug: string): Observable<Eligibility> {
    return this.http.get<Eligibility>(`${this.base}/trails/${slug}/eligibility`);
  }
}
