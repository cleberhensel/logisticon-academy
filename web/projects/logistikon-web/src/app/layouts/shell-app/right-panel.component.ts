import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { UiStateStore } from '../../core/ui-state/ui-state.store';

interface NoticeItem {
  id: string;
  title: string;
  body: string;
  when: string;
  unread: boolean;
}

type Tab = 'notif' | 'help';

@Component({
  selector: 'lk-right-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      background: var(--lk-bg-1);
      border-left: 1px solid var(--lk-border);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--lk-space-3);
      height: var(--lk-topbar-h);
      border-bottom: 1px solid var(--lk-border);
    }
    .tabs { display: flex; gap: var(--lk-space-1); }
    .tab {
      background: transparent;
      border: 1px solid transparent;
      color: var(--lk-text-muted);
      font-size: var(--lk-fs-13);
      padding: 0.25rem 0.625rem;
      border-radius: var(--lk-radius-sm);
      cursor: pointer;
    }
    .tab.active { color: var(--lk-text); border-color: var(--lk-border); background: var(--lk-bg-2); }
    .tab:hover { color: var(--lk-text); }
    .body {
      flex: 1;
      overflow-y: auto;
      padding: var(--lk-space-4);
    }
    .notice {
      padding: var(--lk-space-3);
      border: 1px solid var(--lk-border);
      border-radius: var(--lk-radius-sm);
      background: var(--lk-bg-2);
      margin-bottom: var(--lk-space-3);
      position: relative;
    }
    .notice.unread { border-color: var(--lk-accent); }
    .notice .dot {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--lk-accent);
    }
    .notice h4 {
      margin: 0 0 var(--lk-space-1);
      font-size: var(--lk-fs-13);
      font-weight: var(--lk-fw-medium);
    }
    .notice p { margin: 0 0 var(--lk-space-2); font-size: var(--lk-fs-13); color: var(--lk-text-muted); }
    .notice time { font-size: var(--lk-fs-12); color: var(--lk-text-subtle); }
    .empty {
      text-align: center;
      color: var(--lk-text-muted);
      font-size: var(--lk-fs-13);
      padding: var(--lk-space-8) var(--lk-space-4);
    }
    .help-list { font-size: var(--lk-fs-13); }
    .help-list dt { font-weight: var(--lk-fw-medium); margin-top: var(--lk-space-3); color: var(--lk-text); }
    .help-list dd { margin: var(--lk-space-1) 0 0; color: var(--lk-text-muted); }
    kbd {
      font-family: var(--lk-font-mono);
      font-size: var(--lk-fs-12);
      padding: 1px 6px;
      background: var(--lk-bg-3);
      border: 1px solid var(--lk-border);
      border-radius: 3px;
      color: var(--lk-text);
    }
  `],
  template: `
    <div class="header">
      <div class="tabs" role="tablist" aria-label="Painel lateral">
        <button
          type="button"
          class="tab"
          role="tab"
          [class.active]="tab() === 'notif'"
          [attr.aria-selected]="tab() === 'notif'"
          (click)="setTab('notif')"
        >Notificações</button>
        <button
          type="button"
          class="tab"
          role="tab"
          [class.active]="tab() === 'help'"
          [attr.aria-selected]="tab() === 'help'"
          (click)="setTab('help')"
        >Ajuda</button>
      </div>
      <button type="button" class="btn btn--icon" (click)="ui.setRight(false)" aria-label="Fechar painel">×</button>
    </div>
    <div class="body">
      @if (tab() === 'notif') {
        @if (notices().length === 0) {
          <div class="empty">Sem notificações.</div>
        } @else {
          @for (n of notices(); track n.id) {
            <article class="notice" [class.unread]="n.unread">
              @if (n.unread) { <span class="dot" aria-hidden="true"></span> }
              <h4>{{ n.title }}</h4>
              <p>{{ n.body }}</p>
              <time>{{ n.when }}</time>
            </article>
          }
        }
      } @else {
        <dl class="help-list">
          <dt>Pesquisa rápida</dt>
          <dd><kbd>⌘</kbd> <kbd>K</kbd> ou <kbd>Ctrl</kbd> <kbd>K</kbd> — abrir o palette</dd>

          <dt>Alternar tema</dt>
          <dd>Botão na barra superior — escuro / claro</dd>

          <dt>Sidebar</dt>
          <dd>Botão de menu colapsa/expande a árvore de aulas</dd>

          <dt>Sair</dt>
          <dd>Menu do utilizador na barra superior</dd>

          <dt>Suporte</dt>
          <dd>POC — sem suporte real. Em produção, contactar suporte&#64;logistikon.academy.</dd>
        </dl>
      }
    </div>
  `
})
export class RightPanelComponent {
  readonly ui = inject(UiStateStore);
  readonly tab = signal<Tab>('notif');

  readonly notices = signal<NoticeItem[]>([
    {
      id: 'n1',
      title: 'Bem-vindo à Logistikon Academy',
      body: 'Explore as trilhas publicadas e marque a primeira aula como concluída para acompanhar o seu progresso.',
      when: 'agora',
      unread: true
    },
    {
      id: 'n2',
      title: 'POC em modo simulado',
      body: 'Pagamentos, e-mails e PDFs são simulados localmente. Veja a documentação em docs/ para detalhes.',
      when: 'há 5 min',
      unread: false
    }
  ]);

  setTab(t: Tab): void { this.tab.set(t); }
}
