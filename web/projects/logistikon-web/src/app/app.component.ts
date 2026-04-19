import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'lk-root',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="lk-skip-link" href="#main">Saltar para o conteúdo principal</a>
    <router-outlet />
  `
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  // Injetar para que o effect inicialize o atributo data-theme no <html>.
  private readonly _theme = inject(ThemeService);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          const main = document.getElementById('main');
          if (main) (main as HTMLElement).focus({ preventScroll: false });
        }, 0);
      });
  }
}
