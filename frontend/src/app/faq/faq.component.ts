import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class FAQComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('FAQ - Lively Fencing');
    meta.updateTag({ name: 'description', content: 'Frequently Asked Questions for Lively Fencing Company' });
  }
}
