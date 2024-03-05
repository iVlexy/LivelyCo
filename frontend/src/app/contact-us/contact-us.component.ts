import { HttpClient } from '@angular/common/http';
import { Component, inject, isDevMode, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ MaterialModule, FormsModule ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  #http = inject(HttpClient);

  name = signal('');
  phone = signal('');
  email = signal('');
  selectedServices = signal<string[]>([]);
  description = signal('');

  submitted = false;

  services = [
    'Fence Construction',
    'Grading',
    'Fence Painting',
    'Barn/Shed Construction',
    'Bobcat Operations',
    'Other'
  ];

  constructor(title: Title, meta: Meta) {
    title.setTitle('Contact - Lively Fencing');
    meta.updateTag({ name: 'description', content: 'Contact information for Lively Fencing company' });
  }

  submit() {
    if (this.submitted) return;
    this.submitted = true;

    const data = {
      name: this.name(),
      phone: this.phone(),
      email: this.email(),
      selectedServices: this.selectedServices(),
      description: this.description(),
    };

    this.#http.post('/api/contact', data).subscribe({
      next: () => {
        if (isDevMode()) {
          console.log('contact submission successful');
        }
      },
      error: () => {
        if (isDevMode()) {
          console.error('contact submission failed');
        }
      }
    });
  }
}
