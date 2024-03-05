import { Component} from '@angular/core';
import { MaterialModule } from '../material-module';
import { CommonModule } from '@angular/common';
import { AgricultureImagesComponent } from './agriculture-images/agriculture-images.component';
import { BarnImagesComponent } from './barn-images/barn-images.component';
import { ResidentialImagesComponent } from './residential-images/residential-images.component';
import { RetainingwallImagesComponent } from './retainingwall-images/retainingwall-images.component';
import { GateImagesComponent } from './gate-images/gate-images.component';
import { GradingImagesComponent } from './grading-images/grading-images.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MaterialModule, CommonModule, AgricultureImagesComponent, BarnImagesComponent, ResidentialImagesComponent, RetainingwallImagesComponent, GateImagesComponent, GradingImagesComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent{
 
}
