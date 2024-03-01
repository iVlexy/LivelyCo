import { Component } from '@angular/core';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

}
