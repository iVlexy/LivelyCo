import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { FAQComponent } from './faq/faq.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'About-Us',
    component: AboutUsComponent
  },
  {
    path: 'Contact-Us',
    component: ContactUsComponent
  },
  {
    path: 'Projects',
    component: ProjectsComponent
  },
  {
    path: 'Services',
    component: ServicesComponent
  },
  {
    path: 'FAQ',
    component: FAQComponent
  }
];
