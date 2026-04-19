import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionStore, SessionState, SessionUser } from './session.store';

interface AuthResponse {
  user: SessionUser;
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly session = inject(SessionStore);
  private readonly base = environment.apiBaseUrl;

  register(payload: { email: string; password: string; name: string }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base}/auth/register`, payload)
      .pipe(tap((res) => this.persist(res)));
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base}/auth/login`, payload)
      .pipe(tap((res) => this.persist(res)));
  }

  verifyEmail(token: string): Observable<{ ok: true; user: SessionUser }> {
    return this.http
      .post<{ ok: true; user: SessionUser }>(`${this.base}/auth/verify-email`, { token })
      .pipe(tap((res) => this.session.patchUser(res.user)));
  }

  resendVerification(email: string): Observable<{ ok: true }> {
    return this.http.post<{ ok: true }>(`${this.base}/auth/resend-verification`, { email });
  }

  logout(): void {
    this.session.clear();
  }

  private persist(res: AuthResponse): void {
    const next: SessionState = {
      user: res.user,
      accessToken: res.accessToken,
      refreshToken: res.refreshToken
    };
    this.session.set(next);
  }
}
