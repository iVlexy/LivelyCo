import { HttpClient } from '@angular/common/http';
import { Component, inject, isDevMode, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { MaterialModule } from '../material-module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ MaterialModule, FormsModule, NgxMaskDirective, NgxMaskPipe, ReactiveFormsModule ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  #http = inject(HttpClient);
  #snackbar = inject(MatSnackBar);

  name = signal('');
  phone = signal('');
  email = signal('');
  selectedServices = signal<string[]>([]);
  description = signal('');

  submitted = false;
  success = signal(false);

  services = [
    'Fence Construction',
    'Grading',
    'Fence Painting',
    'Barn/Shed Construction',
    'Retaining Walls',
    'Bobcat Operations',
    'Other'
  ];
  EmailPatternValidator() {
    return Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i);
  }
  
  emailControl = new FormControl('', [ Validators.required, this.EmailPatternValidator() ]);

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

    this.#http.post('contact', data).subscribe({
      next: () => {
        if (isDevMode()) {
          console.log('contact submission successful');
        }
        this.submitted = false;
        this.#snackbar.open('Submission received!');
        this.clear();
        this.success.set(true);
      },
      error: () => {
        if (isDevMode()) {
          console.error('contact submission failed');
        }
        this.submitted = false;
      }
    });
  }

  clear() {
    this.name.set('');
    this.phone.set('');
    this.email.set('');
    this.selectedServices.set([]);
    this.description.set('');
  }
}
