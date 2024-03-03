import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FAQComponent } from './faq/faq.component';
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
    component: AboutUsComponent
  },
  {
    path: 'Contact-Us',
    component: ContactUsComponent
  },
  // {
  //   path: 'Projects',
  //   component: ProjectsComponent
  // },
  // {
  //   path: 'Services',
  //   component: ServicesComponent
  // },
  {
    path: 'FAQ',
    component: FAQComponent
  }
];
