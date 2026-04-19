import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { QuizAnswers, QuizStartResponse, QuizSubmitResponse } from './quiz.models';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  start(moduleId: string): Observable<QuizStartResponse> {
    return this.http.post<QuizStartResponse>(`${this.base}/modules/${moduleId}/quiz/start`, {});
  }

  submit(attemptId: string, answers: QuizAnswers): Observable<QuizSubmitResponse> {
    return this.http.post<QuizSubmitResponse>(`${this.base}/quiz/attempts/${attemptId}/submit`, { answers });
  }
}
