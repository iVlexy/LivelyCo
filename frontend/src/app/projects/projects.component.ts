import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, Pipe, PipeTransform, PLATFORM_ID, signal, untracked } from '@angular/core';
// @ts-ignore
import { NgImageSliderModule } from 'ng-image-slider';
import { forkJoin, switchMap } from 'rxjs';
import { MaterialModule } from '../material-module';

export enum ProjectFolder {
  GatePhotos = 1,
  GradingAndGravelPhotos,
  BarnPhotos,
  RetainingWallPhotos,
  ResidentialFencePhotos,
  AgricultureFencePhotos,
}

interface Carousel {
  title: string;
  folderName: string;
  projectFolder: ProjectFolder;
  imageIds?: string[];
}

interface CarouselImages {
  image: string;
  thumbImage: string;
}

@Pipe({ name: 'carouselImages', standalone: true })
export class CarouselImagesPipe implements PipeTransform {
    transform(carousel: Carousel): CarouselImages[] {
        return carousel.imageIds.map(id => {
          return {
            image: `http://localhost:8158/photos/folders/${id}`,
            thumbImage: `http://localhost:8158/photos/folders/${id}`,
          }
        });
    }
}


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ MaterialModule, CommonModule, NgImageSliderModule, CarouselImagesPipe ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit{

  #http = inject(HttpClient);

  carousels = signal<Carousel[]>([
    {
      title: 'Agriculture Fences',
      folderName: 'AgricultureFencePhotos',
      projectFolder: ProjectFolder.AgricultureFencePhotos
    },
    {
      title: 'Residential Fences',
      folderName: 'ResidentialFencePhotos',
      projectFolder: ProjectFolder.ResidentialFencePhotos
    },
    {
      title: 'Retaining Walls',
      folderName: 'RetainingWallPhotos',
      projectFolder: ProjectFolder.RetainingWallPhotos
    },
    {
      title: 'Barns',
      folderName: 'BarnPhotos',
      projectFolder: ProjectFolder.BarnPhotos
    },
    {
      title: 'Grading and Gravel Laying',
      folderName: 'GradingAndGravelPhotos',
      projectFolder: ProjectFolder.GradingAndGravelPhotos
    },
    {
      title: 'Gates',
      folderName: 'GatePhotos',
      projectFolder: ProjectFolder.GatePhotos
    }
  ]);

  platformId = inject(PLATFORM_ID)

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      const images = untracked(this.carousels)
        .map(carousel => {
          return this.#http.get<string[]>(`photos/folders/${carousel.projectFolder}`)
        });

      forkJoin(images)
        .subscribe((results) => {

          this.carousels.update(carousels => {
            results.forEach((result, index) => {
              carousels[index].imageIds = result;
            });

            return carousels.slice();
          });
        });
    }
  }
}
