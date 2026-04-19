import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LearnService } from '../data/learn.service';
import { Outline, OutlineLesson } from '../data/learn.models';
import { LkLessonContentComponent } from '../../../shared/components/lk-lesson-content/lk-lesson-content.component';
import { NotificationService } from '../../../core/notifications/notification.service';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';
import { LearnContextStore } from '../../../core/learn-context/learn-context.store';

@Component({
  selector: 'lk-player',
  standalone: true,
  imports: [RouterLink, LkLessonContentComponent, DurationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .wrap {
      width: 100%;
      max-width: var(--lk-content-max);
      margin: 0 auto;
      box-sizing: border-box;
      padding: var(--lk-space-6) var(--lk-space-6);
    }
    @media (max-width: 720px) { .wrap { padding: var(--lk-space-4); } }

    .head { margin-bottom: var(--lk-space-5); }
    .crumb {
      font-size: var(--lk-fs-12);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--lk-text-subtle);
      margin: 0 0 var(--lk-space-1);
    }
    h1 {
      font-size: var(--lk-fs-22);
      margin: 0;
      letter-spacing: -0.01em;
    }
    .dur {
      font-size: var(--lk-fs-12);
      color: var(--lk-text-subtle);
      margin-top: var(--lk-space-1);
    }

    .actions {
      margin-top: var(--lk-space-8);
      padding-top: var(--lk-space-4);
      border-top: 1px solid var(--lk-border);
      display: flex;
      justify-content: space-between;
      gap: var(--lk-space-3);
      flex-wrap: wrap;
      align-items: center;
    }
    .actions .nav-link {
      font-size: var(--lk-fs-13);
      color: var(--lk-text-muted);
      max-width: 240px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `],
  template: `
    @if (outline(); as o) {
      <div class="wrap">
        @if (currentLesson(); as lesson) {
          <div class="head">
            <p class="crumb">{{ o.trailTitle }} · M{{ currentModuleOrder() }}</p>
            <h1>{{ lesson.title }}</h1>
            <div class="dur">Duração estimada: {{ lesson.durationMin | lkDuration }}</div>
          </div>

          <lk-lesson-content [mdPath]="lesson.mdPath" [lessonTitle]="lesson.title" />

          <div class="actions">
            @if (prevLesson(); as prev) {
              <a class="nav-link" [routerLink]="['/learn/trilhas', trailIdParam(), 'aulas', prev.id]">← {{ prev.title }}</a>
            } @else {
              <span></span>
            }

            @if (lesson.status !== 'completed') {
              <button class="btn btn--strong btn--lg" type="button" (click)="markCompleted()" [disabled]="saving()">
                {{ saving() ? 'A marcar…' : 'Marcar como concluída' }}
              </button>
            } @else {
              @if (nextLesson(); as next) {
                <a class="btn btn--strong btn--lg" [routerLink]="['/learn/trilhas', trailIdParam(), 'aulas', next.id]">
                  Próxima aula →
                </a>
              } @else {
                <a class="btn btn--strong btn--lg" [routerLink]="['/learn/trilhas', trailIdParam()]">
                  Voltar à trilha
                </a>
              }
            }
          </div>
        }
      </div>
    } @else {
      <div class="wrap">A carregar…</div>
    }
  `
})
export class PlayerPage implements OnInit {
  private readonly learn = inject(LearnService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notify = inject(NotificationService);
  private readonly learnCtx = inject(LearnContextStore);

  readonly outline = signal<Outline | null>(null);
  readonly saving = signal(false);

  trailIdParam = () => this.route.snapshot.paramMap.get('trailId') || '';
  lessonId = () => this.route.snapshot.paramMap.get('lessonId') || '';

  readonly currentLesson = computed<OutlineLesson | undefined>(() => {
    const o = this.outline();
    if (!o) return undefined;
    const id = this.lessonId();
    for (const m of o.modules) {
      const found = m.lessons.find((l) => l.id === id);
      if (found) return found;
    }
    return undefined;
  });

  readonly currentModuleOrder = computed<number>(() => {
    const o = this.outline();
    if (!o) return 0;
    const id = this.lessonId();
    for (const m of o.modules) {
      if (m.lessons.some((l) => l.id === id)) return m.order;
    }
    return 0;
  });

  readonly flatLessons = computed<OutlineLesson[]>(() => {
    const o = this.outline();
    if (!o) return [];
    return o.modules.flatMap((m) => m.lessons);
  });

  readonly prevLesson = computed<OutlineLesson | undefined>(() => {
    const all = this.flatLessons();
    const idx = all.findIndex((l) => l.id === this.lessonId());
    return idx > 0 ? all[idx - 1] : undefined;
  });

  readonly nextLesson = computed<OutlineLesson | undefined>(() => {
    const all = this.flatLessons();
    const idx = all.findIndex((l) => l.id === this.lessonId());
    return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.learnCtx.setActiveLesson(this.lessonId());
      this.reload();
    });
  }

  private reload(): void {
    this.learn.getOutline(this.trailIdParam()).subscribe({
      next: (o) => {
        this.outline.set(o);
        this.learnCtx.setOutline(this.trailIdParam(), o);
      }
    });
  }

  markCompleted(): void {
    const lesson = this.currentLesson();
    if (!lesson) return;
    this.saving.set(true);
    this.learn.updateProgress(this.trailIdParam(), lesson.id, { percent: 100, completed: true }).subscribe({
      next: () => {
        this.saving.set(false);
        this.notify.success('Aula concluída');
        this.reload();
        const next = this.nextLesson();
        if (next) {
          void this.router.navigate(['/learn/trilhas', this.trailIdParam(), 'aulas', next.id]);
        }
      },
      error: () => {
        this.saving.set(false);
        this.notify.error('Não foi possível guardar o progresso.');
      }
    });
  }
}
