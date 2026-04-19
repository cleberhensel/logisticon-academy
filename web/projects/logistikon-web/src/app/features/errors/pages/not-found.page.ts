import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lk-not-found',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .code { font-size: var(--lk-fs-32); font-weight: var(--lk-fw-bold); color: var(--lk-text-muted); margin: 0; letter-spacing: -0.02em; }
    h1 { font-size: var(--lk-fs-20); margin: var(--lk-space-2) 0 var(--lk-space-3); }
    p { color: var(--lk-text-muted); margin: 0; font-size: var(--lk-fs-13); }
    .actions { display: flex; gap: var(--lk-space-2); flex-wrap: wrap; margin-top: var(--lk-space-5); }
  `],
  template: `
    <p class="code">404</p>
    <h1>Página não encontrada</h1>
    <p>O endereço que tentou aceder não existe ou foi movido.</p>
    <div class="actions">
      <a class="btn btn--strong" routerLink="/trilhas">Catálogo</a>
      <a class="btn" routerLink="/">Início</a>
    </div>
  `
})
export class NotFoundPage {}
