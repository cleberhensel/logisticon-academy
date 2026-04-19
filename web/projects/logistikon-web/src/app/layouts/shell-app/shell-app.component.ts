import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { UiStateStore } from '../../core/ui-state/ui-state.store';
import { TopbarComponent } from './topbar.component';
import { LeftSidebarComponent } from './left-sidebar.component';
import { RightPanelComponent } from './right-panel.component';
import { CommandPaletteComponent } from './command-palette.component';
import { LkNotificationsComponent } from '../../shared/components/lk-notifications/lk-notifications.component';

const MIN_PREFIXES = ['/auth', '/erro', '/checkout', '/__stub'];

@Component({
  selector: 'lk-shell-app',
  standalone: true,
  imports: [
    RouterOutlet,
    TopbarComponent,
    LeftSidebarComponent,
    RightPanelComponent,
    CommandPaletteComponent,
    LkNotificationsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: grid;
      grid-template-rows: var(--lk-topbar-h) minmax(0, 1fr);
      height: 100%;
      max-height: 100dvh;
      min-height: 0;
      overflow: hidden;
      background: var(--lk-bg-0);
      color: var(--lk-text);
    }
    /* minmax(0,1fr) + min-width:0 nos filhos evita transbordo de grelha (painel 0px a cobrir o centro) */
    .frame {
      display: grid;
      grid-template-columns: var(--lk-sidebar-w) minmax(0, 1fr) minmax(0, 0);
      grid-template-rows: minmax(0, 1fr);
      min-height: 0;
      min-width: 0;
      overflow: hidden;
    }
    .frame > lk-left-sidebar,
    .frame > main,
    .frame > lk-right-panel {
      min-width: 0;
      min-height: 0;
    }
    .frame.collapsed-left { grid-template-columns: var(--lk-sidebar-w-collapsed) minmax(0, 1fr) minmax(0, 0); }
    .frame.right-open { grid-template-columns: var(--lk-sidebar-w) minmax(0, 1fr) minmax(0, var(--lk-sideright-w)); }
    .frame.collapsed-left.right-open { grid-template-columns: var(--lk-sidebar-w-collapsed) minmax(0, 1fr) minmax(0, var(--lk-sideright-w)); }

    /*
     * Rotas “min” (auth, erro, checkout…): escondemos os painéis com display:none.
     * Nesse caso só o <main> participa na grelha — se mantivermos 3 colunas (0 / 1fr / 0),
     * o <main> é auto-colocado na 1.ª coluna (largura 0) e o painel direito fica na 2.ª (1fr),
     * cobrindo o ecrã. Solução: uma única coluna para o <main> ocupar 100%.
     */
    .frame.min {
      grid-template-columns: minmax(0, 1fr);
    }
    .frame.min lk-left-sidebar,
    .frame.min lk-right-panel { display: none; }

    /* Scroll só no main: não deixar a grelha / painéis roubar altura ao centro */
    main#main {
      position: relative;
      z-index: 1;
      min-width: 0;
      min-height: 0;
      overflow-x: hidden;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-gutter: stable;
      -webkit-overflow-scrolling: touch;
      background: var(--lk-bg-0);
    }
    main#main:focus { outline: none; }

    .min main#main {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--lk-space-10) var(--lk-space-4);
    }
    .min .auth-card {
      width: min(440px, 100%);
      background: var(--lk-bg-1);
      border: 1px solid var(--lk-border);
      border-radius: var(--lk-radius-md);
      padding: var(--lk-space-8);
    }

    /*
     * Sem sidebar visível: só main + painel direito na grelha — usar 2 colunas (não 3 com 1.ª a 0),
     * senão o <main> cai na coluna de largura 0 (mesmo bug que em .min).
     */
    @media (max-width: 800px) {
      .frame:not(.min) {
        grid-template-columns: minmax(0, 1fr) minmax(0, 0) !important;
      }
      .frame:not(.min) lk-left-sidebar { display: none; }
      .frame:not(.min).right-open {
        grid-template-columns: minmax(0, 1fr) minmax(0, min(var(--lk-sideright-w), 92vw)) !important;
      }
    }
  `],
  template: `
    <lk-topbar />

    <div
      class="frame"
      [class.collapsed-left]="ui.leftCollapsed()"
      [class.right-open]="ui.rightOpen()"
      [class.min]="isMin()"
    >
      <lk-left-sidebar />

      <main id="main" tabindex="-1">
        @if (isMin()) {
          <div class="auth-card">
            <router-outlet />
          </div>
        } @else {
          <router-outlet />
        }
      </main>

      <lk-right-panel />
    </div>

    <lk-command-palette />
    <lk-notifications />
  `
})
export class ShellAppComponent implements OnInit, OnDestroy {
  readonly ui = inject(UiStateStore);
  private readonly router = inject(Router);

  private readonly _url = signal<string>(this.router.url);
  private sub?: Subscription;

  readonly isMin = computed(() => {
    const url = this._url().split('?')[0];
    return MIN_PREFIXES.some((p) => url === p || url.startsWith(p + '/'));
  });

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this._url.set(e.urlAfterRedirects));
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
