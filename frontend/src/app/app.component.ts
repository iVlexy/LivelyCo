import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatNavList } from '@angular/material/list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MatFormField, MatLabel, MatInput, MatNavList, MatSidenavContainer, MatSidenavContent, MatSidenav, MatToolbar, MatIconButton, MatIcon ],
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
