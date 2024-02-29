import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatNavList } from '@angular/material/list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, RouterOutlet, MatFormField, MatLabel, MatInput, MatNavList, MatSidenavContainer, MatSidenavContent, MatSidenav, MatToolbar, MatIconButton, MatIcon, MatTooltip, MatButton ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LivelyCo';

  readonly isSmallScreen = toSignal(
    inject(BreakpointObserver).observe([ Breakpoints.XSmall ])
      .pipe(map(state => state.matches), distinctUntilChanged())
  );
}
