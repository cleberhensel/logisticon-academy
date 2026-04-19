import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CatalogService } from '../data/catalog.service';
import { CatalogTrailListItem } from '../data/catalog.models';
import { LkTrailCardComponent } from '../../../shared/components/lk-trail-card/lk-trail-card.component';

@Component({
  selector: 'lk-catalog-list',
  standalone: true,
  imports: [LkTrailCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--lk-space-4);
      margin-bottom: var(--lk-space-6);
      flex-wrap: wrap;
    }
    .header h1 { font-size: var(--lk-fs-22); margin: 0; }
    .lead {
      color: var(--lk-text-muted);
      font-size: var(--lk-fs-13);
      max-width: 60ch;
      margin: var(--lk-space-1) 0 0;
    }
    .pager {
      margin-top: var(--lk-space-6);
      display: flex;
      gap: var(--lk-space-2);
      justify-content: center;
      align-items: center;
    }
    .pager span { font-size: var(--lk-fs-13); color: var(--lk-text-muted); padding: 0 var(--lk-space-3); }
    .empty, .loading {
      padding: var(--lk-space-8);
      text-align: center;
      border: 1px dashed var(--lk-border-strong);
      border-radius: var(--lk-radius-md);
      color: var(--lk-text-muted);
      font-size: var(--lk-fs-13);
    }
  `],
  template: `
    <section class="lk-page">
      <div class="header">
        <div>
          <h1>Catálogo</h1>
          <p class="lead">Trilhas em PT-PT para profissionais de logística e supply chain. Conteúdo prático, com avaliação e certificado.</p>
        </div>
        @if (!loading() && !errorMsg()) {
          <span class="badge">{{ total() }} {{ total() === 1 ? 'trilha' : 'trilhas' }}</span>
        }
      </div>

      @if (loading()) {
        <div class="loading" aria-live="polite">A carregar trilhas…</div>
      } @else if (errorMsg()) {
        <div class="alert alert--error" role="alert">{{ errorMsg() }}</div>
      } @else if (items().length === 0) {
        <div class="empty">Ainda não há trilhas publicadas. Volte em breve.</div>
      } @else {
        <div class="lk-grid">
          @for (t of items(); track t.id) {
            <lk-trail-card
              [trail]="{
                slug: t.slug,
                title: t.title,
                summary: t.summary,
                level: t.level,
                durationHours: t.durationHours,
                priceLabel: priceLabel(t)
              }"
            />
          }
        </div>

        <div class="pager">
          <button type="button" class="btn btn--sm" (click)="prev()" [disabled]="page() <= 1">← Anterior</button>
          <span aria-live="polite">Página {{ page() }} de {{ totalPages() }}</span>
          <button type="button" class="btn btn--sm" (click)="next()" [disabled]="page() >= totalPages()">Seguinte →</button>
        </div>
      }
    </section>
  `
})
export class CatalogListPage implements OnInit {
  private readonly catalog = inject(CatalogService);

  readonly loading = signal(true);
  readonly errorMsg = signal<string | null>(null);
  readonly items = signal<CatalogTrailListItem[]>([]);
  readonly page = signal(1);
  readonly pageSize = signal(12);
  readonly total = signal(0);

  totalPages = () => Math.max(1, Math.ceil(this.total() / this.pageSize()));

  ngOnInit(): void {
    this.load(1);
  }

  prev(): void {
    if (this.page() > 1) this.load(this.page() - 1);
  }

  next(): void {
    if (this.page() < this.totalPages()) this.load(this.page() + 1);
  }

  priceLabel(t: CatalogTrailListItem): string {
    if (!t.price) return '';
    return `${(t.price.amountCents / 100).toFixed(2)} ${t.price.currency}`;
  }

  private load(page: number): void {
    this.loading.set(true);
    this.errorMsg.set(null);
    this.catalog.list(page, this.pageSize()).subscribe({
      next: (res) => {
        this.items.set(res.items);
        this.page.set(res.page);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => {
        this.errorMsg.set('Não foi possível carregar o catálogo. Tente novamente.');
        this.loading.set(false);
      }
    });
  }
}
