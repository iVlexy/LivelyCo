import { Component } from '@angular/core';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

}
