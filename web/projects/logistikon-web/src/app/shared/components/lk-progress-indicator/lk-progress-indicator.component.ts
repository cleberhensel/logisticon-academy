import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lk-progress-indicator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host { display: block; }
    .bar {
      width: 100%;
      height: 6px;
      background: var(--lk-bg-3);
      border-radius: 3px;
      overflow: hidden;
    }
    .fill {
      height: 100%;
      background: var(--lk-accent);
      transition: width 200ms ease;
    }
    .label {
      font-size: var(--lk-fs-12);
      color: var(--lk-text-muted);
      margin-top: var(--lk-space-1);
    }
  `],
  template: `
    <div class="bar" role="progressbar" [attr.aria-valuenow]="clamped" aria-valuemin="0" aria-valuemax="100" [attr.aria-label]="label">
      <div class="fill" [style.width.%]="clamped"></div>
    </div>
    @if (showLabel) { <div class="label">{{ clamped }}% concluído</div> }
  `
})
export class LkProgressIndicatorComponent {
  @Input() percent = 0;
  @Input() showLabel = true;
  @Input() label = 'Progresso';

  get clamped(): number {
    return Math.max(0, Math.min(100, Math.round(this.percent)));
  }
}
