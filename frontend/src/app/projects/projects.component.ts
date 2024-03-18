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
  imageUrls?: string[];
}

interface CarouselImages {
  image: string;
  thumbImage: string;
}

@Pipe({ name: 'carouselImages', standalone: true })
export class CarouselImagesPipe implements PipeTransform {
    transform(carousel: Carousel): CarouselImages[] {
        return carousel.imageUrls.map(url => {
          return {
            image: url,
            thumbImage: url,
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
            .pipe(switchMap(imageIds => {
              return forkJoin(
                imageIds.map(imageId => this.#http.get(`photos/${imageId}`, { responseType: 'blob' }))
              )
            }));
        });

      forkJoin(images)
        .subscribe((results) => {

          this.carousels.update(carousels => {
            results.forEach((result, index) => {
              carousels[index].imageUrls = result.map(blob => window.URL.createObjectURL(blob));
            });

            return carousels.slice();
          });
        });
    }
  }
}
