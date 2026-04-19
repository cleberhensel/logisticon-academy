import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Enrollment, Outline, ProgressUpdatePayload } from './learn.models';

@Injectable({ providedIn: 'root' })
export class LearnService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  listEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.base}/enrollments`);
  }

  hasEnrollment(trailId: string): Observable<boolean> {
    return this.listEnrollments().pipe(map((list) => list.some((e) => e.trailId === trailId || e.trailSlug === trailId)));
  }

  getOutline(trailIdOrSlug: string): Observable<Outline> {
    return this.http.get<Outline>(`${this.base}/enrollments/${trailIdOrSlug}/outline`);
  }

  updateProgress(trailIdOrSlug: string, lessonId: string, payload: ProgressUpdatePayload): Observable<{ ok: true; outlineProgressPercent: number }> {
    return this.http.patch<{ ok: true; outlineProgressPercent: number }>(
      `${this.base}/enrollments/${trailIdOrSlug}/lessons/${lessonId}/progress`,
      payload
    );
  }
}
