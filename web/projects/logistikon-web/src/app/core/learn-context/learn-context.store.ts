import { Injectable, computed, signal } from '@angular/core';
import type { Outline } from '../../features/learn/data/learn.models';

/**
 * Estado partilhado da trilha em curso (alimentado por OutlinePage e PlayerPage)
 * para que o shell possa renderizar a árvore contextual na sidebar esquerda.
 */
@Injectable({ providedIn: 'root' })
export class LearnContextStore {
  private readonly _outline = signal<Outline | null>(null);
  private readonly _trailIdOrSlug = signal<string | null>(null);
  private readonly _activeLessonId = signal<string | null>(null);

  readonly outline = computed(() => this._outline());
  readonly trailIdOrSlug = computed(() => this._trailIdOrSlug());
  readonly activeLessonId = computed(() => this._activeLessonId());

  setOutline(trailIdOrSlug: string, outline: Outline | null): void {
    this._trailIdOrSlug.set(trailIdOrSlug);
    this._outline.set(outline);
  }

  setActiveLesson(lessonId: string | null): void {
    this._activeLessonId.set(lessonId);
  }

  clear(): void {
    this._outline.set(null);
    this._trailIdOrSlug.set(null);
    this._activeLessonId.set(null);
  }
}
