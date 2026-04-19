import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiStateStore } from '../../core/ui-state/ui-state.store';
import { LearnContextStore } from '../../core/learn-context/learn-context.store';
import { SessionStore } from '../../core/auth/session.store';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  link: string;
  exact?: boolean;
  authOnly?: boolean;
}

@Component({
  selector: 'lk-left-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--lk-bg-1);
      border-right: 1px solid var(--lk-border);
      overflow: hidden;
    }
    .rail {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: var(--lk-space-2) var(--lk-space-2);
      border-bottom: 1px solid var(--lk-border);
    }
    .rail-link {
      display: flex;
      align-items: center;
      gap: var(--lk-space-2);
      padding: 0.28rem 0.4rem;
      min-height: 2rem;
      color: var(--lk-text-muted);
      border: 1px solid transparent;
      border-radius: var(--lk-radius-sm);
      font-size: var(--lk-fs-12);
      line-height: 1.25;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      overflow: hidden;
    }
    .rail-link:hover {
      background: var(--lk-bg-hover);
      color: var(--lk-text);
      border-color: var(--lk-border);
    }
    .rail-link.active {
      background: var(--lk-accent-faint);
      color: var(--lk-accent);
      border-color: var(--lk-accent);
    }
    .rail-link .ic {
      font-size: var(--lk-fs-14);
      width: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    :host(.collapsed) .rail-link .lbl { display: none; }
    :host(.collapsed) .rail-link { justify-content: center; padding: 0.28rem; min-height: 2rem; }
    :host(.collapsed) .ctx { display: none; }

    .ctx {
      flex: 1;
      overflow-y: auto;
      padding: var(--lk-space-2) var(--lk-space-2);
    }
    .ctx-empty {
      font-size: var(--lk-fs-12);
      color: var(--lk-text-subtle);
      text-align: center;
      padding: var(--lk-space-4) var(--lk-space-2);
      line-height: 1.45;
    }
    .trail-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--lk-text-subtle);
      margin: 0 0 2px;
    }
    .trail-name {
      font-size: var(--lk-fs-13);
      color: var(--lk-text);
      font-weight: var(--lk-fw-medium);
      margin: 0 0 var(--lk-space-2);
      line-height: 1.25;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .module {
      margin-bottom: 2px;
      border-radius: var(--lk-radius-sm);
      border: 1px solid transparent;
    }
    .module:has(.module-toggle:focus-visible) {
      border-color: var(--lk-border-strong);
    }
    .module-toggle {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      width: 100%;
      margin: 0;
      padding: 0.35rem 0.3rem;
      border: none;
      border-radius: var(--lk-radius-sm);
      background: transparent;
      color: var(--lk-text-muted);
      font: inherit;
      font-size: 10px;
      font-weight: var(--lk-fw-medium);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      text-align: left;
      cursor: pointer;
      line-height: 1.2;
    }
    .module-toggle:hover {
      background: var(--lk-bg-hover);
      color: var(--lk-text);
    }
    .module-toggle .chev {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin-top: 1px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: var(--lk-text-subtle);
      transition: transform 0.15s ease;
    }
    .module-toggle[aria-expanded='true'] .chev {
      transform: rotate(90deg);
    }
    .module-toggle .mod-lbl {
      flex: 1;
      min-width: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .lessons-wrap {
      margin: 0;
      padding: 0 0 4px 2px;
    }
    ul.lessons {
      list-style: none;
      padding: 0 0 0 14px;
      margin: 0;
      border-left: 1px solid var(--lk-border);
    }
    .lesson {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      padding: 0.2rem 0.25rem;
      font-size: var(--lk-fs-12);
      border-radius: var(--lk-radius-sm);
      color: var(--lk-text-muted);
      text-decoration: none;
      line-height: 1.28;
    }
    .lesson:hover { background: var(--lk-bg-hover); color: var(--lk-text); }
    .lesson.current {
      background: var(--lk-bg-3);
      color: var(--lk-text);
      border-left: 2px solid var(--lk-accent);
      margin-left: -15px;
      padding-left: calc(0.25rem + 13px);
    }
    .lesson.locked { color: var(--lk-text-subtle); cursor: default; }
    .lesson.locked:hover { background: transparent; color: var(--lk-text-subtle); }
    .lesson .mark {
      width: 12px;
      flex-shrink: 0;
      text-align: center;
      font-size: 10px;
      line-height: 1.35;
      color: var(--lk-text-subtle);
      margin-top: 1px;
    }
    .lesson .t {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-width: 0;
    }
    .lesson.completed .mark { color: var(--lk-success); }
    .lesson.current .mark { color: var(--lk-accent); }
    .progress {
      margin-top: var(--lk-space-2);
      padding-top: var(--lk-space-2);
      border-top: 1px solid var(--lk-border);
      font-size: 11px;
      color: var(--lk-text-muted);
    }
    .bar {
      height: 4px;
      background: var(--lk-bg-3);
      border-radius: 2px;
      margin-top: var(--lk-space-1);
      overflow: hidden;
    }
    .bar > i {
      display: block;
      height: 100%;
      background: var(--lk-accent);
      transition: width 200ms ease;
    }
  `],
  host: {
    '[class.collapsed]': 'ui.leftCollapsed()'
  },
  template: `
    <nav class="rail" aria-label="Navegação principal">
      @for (item of nav(); track item.id) {
        <a
          class="rail-link"
          [routerLink]="item.link"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: !!item.exact }"
          [attr.aria-label]="item.label"
          [attr.title]="item.label"
        >
          <span class="ic" aria-hidden="true">{{ item.icon }}</span>
          <span class="lbl">{{ item.label }}</span>
        </a>
      }
    </nav>

    <div class="ctx">
      @if (outline(); as o) {
        <p class="trail-title">Trilha em curso</p>
        <p class="trail-name">{{ o.trailTitle }}</p>

        @for (m of o.modules; track m.id) {
          <div class="module">
            <button
              type="button"
              class="module-toggle"
              [attr.aria-expanded]="isModuleOpen(m.id)"
              [attr.aria-controls]="'mod-lessons-' + m.id"
              [id]="'mod-h-' + m.id"
              (click)="toggleModule(m.id, $event)"
            >
              <span class="chev" aria-hidden="true">›</span>
              <span class="mod-lbl">M{{ m.order }} · {{ m.title }}</span>
            </button>
            @if (isModuleOpen(m.id)) {
              <div class="lessons-wrap" [id]="'mod-lessons-' + m.id" role="region" [attr.aria-labelledby]="'mod-h-' + m.id">
                <ul class="lessons">
                  @for (l of m.lessons; track l.id) {
                    @if (l.status === 'locked') {
                      <li class="lesson locked" aria-disabled="true">
                        <span class="mark" aria-hidden="true">⌬</span>
                        <span class="t">{{ l.title }}</span>
                      </li>
                    } @else {
                      <li>
                        <a
                          class="lesson"
                          [class.current]="l.id === activeLesson()"
                          [class.completed]="l.status === 'completed'"
                          [routerLink]="['/learn/trilhas', trailParam(), 'aulas', l.id]"
                        >
                          <span class="mark" aria-hidden="true">
                            {{ l.status === 'completed' ? '✓' : '·' }}
                          </span>
                          <span class="t">{{ l.title }}</span>
                        </a>
                      </li>
                    }
                  }
                </ul>
              </div>
            }
          </div>
        }

        <div class="progress">
          <span>Progresso · {{ o.progressPercent }}%</span>
          <div class="bar"><i [style.width.%]="o.progressPercent"></i></div>
        </div>
      } @else {
        <div class="ctx-empty">
          Abra uma trilha para ver o índice de módulos e aulas aqui.
        </div>
      }
    </div>
  `
})
export class LeftSidebarComponent {
  readonly ui = inject(UiStateStore);
  readonly learnCtx = inject(LearnContextStore);
  private readonly session = inject(SessionStore);

  readonly outline = this.learnCtx.outline;
  readonly activeLesson = this.learnCtx.activeLessonId;

  /** `false` = módulo colapsado; omitido/undefined = expandido (predefinição). */
  private readonly moduleCollapsed = signal<Record<string, boolean>>({});

  private readonly lastTrailKey = signal<string | null>(null);

  constructor() {
    effect(() => {
      const trail = this.learnCtx.trailIdOrSlug();
      const o = this.learnCtx.outline();
      const active = this.learnCtx.activeLessonId();
      if (!trail || !o?.modules?.length) return;

      if (this.lastTrailKey() !== trail) {
        this.lastTrailKey.set(trail);
        this.moduleCollapsed.set({});
        return;
      }

      if (!active) return;
      const mod = o.modules.find((m) => m.lessons.some((l) => l.id === active));
      if (!mod) return;
      if (this.moduleCollapsed()[mod.id] === true) {
        this.moduleCollapsed.update((prev) => ({ ...prev, [mod.id]: false }));
      }
    });
  }

  isModuleOpen(moduleId: string): boolean {
    return this.moduleCollapsed()[moduleId] !== true;
  }

  toggleModule(moduleId: string, ev: Event): void {
    ev.preventDefault();
    this.moduleCollapsed.update((prev) => {
      const collapsed = prev[moduleId] === true;
      return { ...prev, [moduleId]: !collapsed };
    });
  }

  trailParam(): string {
    return this.learnCtx.trailIdOrSlug() ?? '';
  }

  readonly nav = computed<NavItem[]>(() => {
    const auth = this.session.isAuthenticated();
    const items: NavItem[] = [
      { id: 'home', label: 'Catálogo', icon: '⌂', link: '/trilhas', exact: false }
    ];
    if (auth) {
      items.push({ id: 'learn', label: 'Minhas trilhas', icon: '▤', link: '/learn', exact: true, authOnly: true });
    }
    items.push({ id: 'verify', label: 'Validar certificado', icon: '✓', link: '/certificado/verificar' });
    return items;
  });
}
