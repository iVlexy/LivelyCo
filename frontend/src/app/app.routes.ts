import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'About-Us',
    loadComponent: () => import('./about-us/about-us.component').then(m => m.AboutUsComponent),
  },
  {
    path: 'Contact-Us',
    loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent),
  },
  // {
  //   path: 'Projects',
  //   component: ProjectsComponent
  // },
  {
    path: 'Services',
    loadComponent: () => import('./services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'FAQ',
    loadComponent: () => import('./faq/faq.component').then(m => m.FAQComponent)
  }
];
