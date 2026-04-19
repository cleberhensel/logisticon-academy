import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lk-server-error',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .code { font-size: var(--lk-fs-32); font-weight: var(--lk-fw-bold); color: var(--lk-danger); margin: 0; letter-spacing: -0.02em; }
    h1 { font-size: var(--lk-fs-20); margin: var(--lk-space-2) 0 var(--lk-space-3); }
    p { color: var(--lk-text-muted); margin: 0; font-size: var(--lk-fs-13); }
    .actions { display: flex; gap: var(--lk-space-2); flex-wrap: wrap; margin-top: var(--lk-space-5); }
  `],
  template: `
    <p class="code">500</p>
    <h1>Erro inesperado</h1>
    <p>Algo correu mal do nosso lado. Tente recarregar a página ou voltar mais tarde.</p>
    <div class="actions">
      <button type="button" class="btn btn--strong" (click)="reload()">Recarregar</button>
      <a class="btn" routerLink="/">Início</a>
    </div>
  `
})
export class ServerErrorPage {
  reload(): void {
    window.location.reload();
  }
}
