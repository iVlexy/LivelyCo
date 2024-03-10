import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material-module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ MaterialModule, RouterModule, RouterOutlet, NgxMaskDirective,  NgxMaskPipe],
  providers: [provideNgxMask()],
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
