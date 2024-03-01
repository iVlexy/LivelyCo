import { Component } from '@angular/core';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FAQComponent {

}
