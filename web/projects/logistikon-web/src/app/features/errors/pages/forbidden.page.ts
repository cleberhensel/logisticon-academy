import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lk-forbidden',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .code { font-size: var(--lk-fs-32); font-weight: var(--lk-fw-bold); color: var(--lk-warn); margin: 0; letter-spacing: -0.02em; }
    h1 { font-size: var(--lk-fs-20); margin: var(--lk-space-2) 0 var(--lk-space-3); }
    p { color: var(--lk-text-muted); margin: 0; font-size: var(--lk-fs-13); }
    .actions { display: flex; gap: var(--lk-space-2); flex-wrap: wrap; margin-top: var(--lk-space-5); }
  `],
  template: `
    <p class="code">403</p>
    <h1>Acesso negado</h1>
    <p>Não tem permissão para aceder a este conteúdo. Confirme que está autenticado e que tem matrícula na trilha.</p>
    <div class="actions">
      <a class="btn btn--strong" routerLink="/learn">Área do aluno</a>
      <a class="btn" routerLink="/trilhas">Catálogo</a>
    </div>
  `
})
export class ForbiddenPage {}
