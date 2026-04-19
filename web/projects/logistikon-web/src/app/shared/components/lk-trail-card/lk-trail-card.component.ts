import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface TrailCardData {
  slug: string;
  title: string;
  summary: string;
  level: string;
  durationHours: number;
  priceLabel?: string;
}

@Component({
  selector: 'lk-trail-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      background: var(--lk-bg-1);
      border: 1px solid var(--lk-border);
      border-radius: var(--lk-radius-md);
      padding: var(--lk-space-4);
      transition: border-color 120ms ease, background-color 120ms ease;
      height: 100%;
    }
    :host(:hover) {
      border-color: var(--lk-border-strong);
      background: var(--lk-bg-2);
    }
    h3 {
      margin: 0 0 var(--lk-space-2);
      font-size: var(--lk-fs-15);
      font-weight: var(--lk-fw-medium);
      line-height: 1.3;
    }
    p.summary {
      margin: 0 0 var(--lk-space-3);
      color: var(--lk-text-muted);
      font-size: var(--lk-fs-13);
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .meta {
      display: flex;
      gap: var(--lk-space-2);
      flex-wrap: wrap;
      font-size: var(--lk-fs-12);
      margin-bottom: var(--lk-space-3);
    }
    .footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--lk-space-3);
      border-top: 1px solid var(--lk-border);
    }
    .price { font-size: var(--lk-fs-13); color: var(--lk-text); font-weight: var(--lk-fw-medium); }
    .price.no { color: var(--lk-text-subtle); font-weight: var(--lk-fw-regular); }
  `],
  template: `
    <h3>{{ trail.title }}</h3>
    <p class="summary">{{ trail.summary }}</p>
    <div class="meta">
      <span class="badge">{{ trail.level }}</span>
      <span class="badge">{{ trail.durationHours }}h</span>
    </div>
    <div class="footer">
      @if (trail.priceLabel) {
        <span class="price">{{ trail.priceLabel }}</span>
      } @else {
        <span class="price no">Sem preço</span>
      }
      <a class="btn btn--sm" [routerLink]="['/trilhas', trail.slug]">Ver detalhe →</a>
    </div>
  `
})
export class LkTrailCardComponent {
  @Input({ required: true }) trail!: TrailCardData;
}
