import { Component} from '@angular/core';
import { MaterialModule } from '../material-module';
import { CommonModule } from '@angular/common';
import { ImageDisplayComponent } from './image-display/image-display.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MaterialModule, CommonModule, ImageDisplayComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent{
 
}
