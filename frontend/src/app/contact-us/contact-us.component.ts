import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MaterialModule, NgOptimizedImage],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class ContactUsComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Contact - Lively Fencing');
    meta.updateTag({ name: 'description', content: 'Contact information for Lively Fencing company' });
  }
}
