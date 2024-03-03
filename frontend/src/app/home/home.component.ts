import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, RouterModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('Home - Lively Fencing');
    meta.updateTag({ name: 'description', content: 'Home landing page for Lively Fencing Company' });
  }
}
