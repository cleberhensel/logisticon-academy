import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Certificate, CertificateVerifyResult } from './certificates.models';

@Injectable({ providedIn: 'root' })
export class CertificatesService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  issue(trailIdOrSlug: string): Observable<Certificate> {
    return this.http.post<Certificate>(`${this.base}/enrollments/${trailIdOrSlug}/certificate`, {});
  }

  verify(code: string): Observable<CertificateVerifyResult> {
    return this.http.get<CertificateVerifyResult>(`${this.base}/certificates/verify`, {
      params: new HttpParams().set('code', code)
    });
  }
}
