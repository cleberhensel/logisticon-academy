import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { UiStateStore } from '../../core/ui-state/ui-state.store';
import { ThemeService } from '../../core/theme/theme.service';
import { SessionStore } from '../../core/auth/session.store';
import { AuthService } from '../../core/auth/auth.service';

interface Crumb { label: string; link?: string; }

const CRUMB_LABELS: Record<string, string> = {
  trilhas: 'Catálogo',
  learn: 'Minhas trilhas',
  aulas: 'Aula',
  modulos: 'Módulo',
  quiz: 'Avaliação',
  certificado: 'Certificado',
  verificar: 'Validar',
  auth: 'Conta',
  login: 'Entrar',
  registo: 'Criar conta',
  'verificar-email': 'Verificar e-mail',
  checkout: 'Pagamento',
  sucesso: 'Sucesso',
  cancelado: 'Cancelado',
  erro: 'Erro'
};

@Component({
  selector: 'lk-topbar',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: var(--lk-space-3);
      height: var(--lk-topbar-h);
      padding: 0 var(--lk-space-3);
      background: var(--lk-bg-1);
      border-bottom: 1px solid var(--lk-border);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: var(--lk-space-2);
      font-weight: var(--lk-fw-bold);
      color: var(--lk-text);
      text-decoration: none;
      font-size: var(--lk-fs-14);
      padding: 0 var(--lk-space-2);
      letter-spacing: -0.01em;
    }
    .brand .dot {
      width: 8px; height: 8px;
      background: var(--lk-accent);
      border-radius: 2px;
    }
    .crumbs {
      display: flex;
      align-items: center;
      gap: var(--lk-space-2);
      font-size: var(--lk-fs-13);
      color: var(--lk-text-muted);
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
    .crumbs a { color: var(--lk-text-muted); text-decoration: none; }
    .crumbs a:hover { color: var(--lk-text); }
    .crumbs .sep { color: var(--lk-text-subtle); }
    .crumbs .cur { color: var(--lk-text); font-weight: var(--lk-fw-medium); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .actions { display: flex; align-items: center; gap: var(--lk-space-1); }
    .palette-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--lk-space-2);
      padding: 0.375rem 0.75rem;
      background: var(--lk-bg-2);
      border: 1px solid var(--lk-border);
      border-radius: var(--lk-radius-sm);
      color: var(--lk-text-muted);
      font-size: var(--lk-fs-13);
      cursor: pointer;
      min-width: 180px;
      justify-content: space-between;
    }
    .palette-btn:hover { color: var(--lk-text); border-color: var(--lk-border-strong); }
    kbd {
      font-family: var(--lk-font-mono);
      font-size: var(--lk-fs-12);
      padding: 1px 5px;
      background: var(--lk-bg-3);
      border: 1px solid var(--lk-border);
      border-radius: 3px;
      color: var(--lk-text-subtle);
    }
    .user {
      display: inline-flex;
      align-items: center;
      gap: var(--lk-space-2);
      padding: 0.25rem 0.625rem;
      font-size: var(--lk-fs-13);
      color: var(--lk-text-muted);
      border: 1px solid transparent;
      border-radius: var(--lk-radius-sm);
    }
    .user .name { color: var(--lk-text); max-width: 140px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  `],
  template: `
    <button
      type="button"
      class="btn btn--icon"
      (click)="ui.toggleLeft()"
      [attr.aria-label]="ui.leftCollapsed() ? 'Expandir sidebar' : 'Colapsar sidebar'"
      title="Menu"
    >☰</button>

    <a class="brand" routerLink="/trilhas">
      <span class="dot" aria-hidden="true"></span>
      Logistikon
    </a>

    <nav class="crumbs" aria-label="Localização">
      @for (c of crumbs(); track $index; let last = $last) {
        @if (!last && c.link) {
          <a [routerLink]="c.link">{{ c.label }}</a>
          <span class="sep" aria-hidden="true">›</span>
        } @else {
          <span class="cur">{{ c.label }}</span>
        }
      }
    </nav>

    <div class="actions">
      <button
        type="button"
        class="palette-btn"
        (click)="ui.openPalette()"
        aria-label="Pesquisa rápida"
        title="Pesquisar (⌘K / Ctrl K)"
      >
        <span>⌕ Pesquisar…</span>
        <kbd>⌘K</kbd>
      </button>

      <button
        type="button"
        class="btn btn--icon"
        (click)="theme.toggle()"
        [attr.aria-label]="'Alternar tema (atual: ' + theme.mode() + ')'"
        title="Alternar tema"
      >{{ theme.isDark() ? '◐' : '◑' }}</button>

      <button
        type="button"
        class="btn btn--icon"
        (click)="ui.toggleRight()"
        [attr.aria-label]="ui.rightOpen() ? 'Fechar painel lateral' : 'Abrir painel lateral'"
        title="Notificações & ajuda"
      >☰</button>

      @if (isAuth()) {
        <span class="user">
          @if (isAdmin()) {
            <span class="badge badge--admin" title="Sessão admin">Admin</span>
          }
          <span class="name">{{ session.user()?.name }}</span>
        </span>
        <button type="button" class="btn btn--sm" (click)="logout()">Sair</button>
      } @else {
        <a class="btn btn--sm" routerLink="/auth/login">Entrar</a>
        <a class="btn btn--sm btn--strong" routerLink="/auth/registo">Criar conta</a>
      }
    </div>
  `
})
export class TopbarComponent implements OnInit, OnDestroy {
  readonly ui = inject(UiStateStore);
  readonly theme = inject(ThemeService);
  readonly session = inject(SessionStore);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isAuth = this.session.isAuthenticated;
  readonly isAdmin = this.session.isAdmin;

  private readonly _url = signal<string>(this.router.url);
  private sub?: Subscription;

  readonly crumbs = computed<Crumb[]>(() => {
    const url = this._url().split('?')[0];
    const parts = url.split('/').filter(Boolean);
    if (parts.length === 0) return [{ label: 'Início' }];
    const list: Crumb[] = [];
    let path = '';
    for (let i = 0; i < parts.length; i++) {
      path += '/' + parts[i];
      const raw = decodeURIComponent(parts[i]);
      const label = CRUMB_LABELS[raw] ?? this.humanize(raw);
      list.push({ label, link: i < parts.length - 1 ? path : undefined });
    }
    return list;
  });

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this._url.set(e.urlAfterRedirects));
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/']);
  }

  private humanize(s: string): string {
    if (s.length > 30) return s.slice(0, 28) + '…';
    return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
