import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  constructor(title: Title, meta: Meta) {
    title.setTitle('About - Lively Fencing');
    meta.updateTag({ name: 'description', content: 'About Lively Fencing Company' });
  }
}
