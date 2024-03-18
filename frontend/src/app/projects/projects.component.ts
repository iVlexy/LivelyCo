import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { MaterialModule } from '../material-module';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MaterialModule, CommonModule, NgImageSliderModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit{

  #http = inject(HttpClient);
  platformId = inject(PLATFORM_ID)
  AgricultureFencePhotos: Array<object> = [];
  ResidentialFencePhotos: Array<object> = [];
  RetainingWallPhotos: Array<object> = [];
  BarnPhotos: Array<object> = [];
  GradingAndGravelPhotos: Array<object> = [];
  GatePhotos: Array<object> = [];

  imageObjs = [
    this.AgricultureFencePhotos,
    //this.ResidentialFencePhotos,
    //this.RetainingWallPhotos,
    //this.BarnPhotos,
    //this.GradingAndGravelPhotos,
   //this.GatePhotos
  ]
  folderNames = [
    'AgricultureFencePhotos',
    //'/ResidentialFencePhotos',
    //'/RetainingWallPhotos',
    //'/BarnPhotos',
    //'/GradingAndGravelPhotos',
    //'/GatePhotos'
  ]


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      for (let index = 0; index < this.imageObjs.length; index++) {
        this.getImages(this.imageObjs[index], this.folderNames[index])
      }
    }

  }

  getImages(imageFolder: Array<object>, folderName: string) {
    this.#http.get<string[]>(folderName).subscribe(result => {
      result.forEach(id => {
        imageFolder.push(
          {
            image: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
            thumbImage: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`
          }
        );
      })

    })
  };












  // imageAgriObject: Array<object> = [
  //   {
  //     image: 'https://drive.google.com/thumbnail?id=1DoOh23viWuI2nyWsqlT_ANEv7mQyO60w&sz=w1000',
  //     thumbImage: 'https://drive.google.com/thumbnail?id=1DoOh23viWuI2nyWsqlT_ANEv7mQyO60w&sz=w1000',
  //   }
  // ];
  imageResObject: Array<object> = [
    {
      image: '/assets/images/IMG_5984.jpg',
      thumbImage: '/assets/images/IMG_5984.jpg'
    },
    {
      image: '/assets/images/IMG_5991.png',
      thumbImage: '/assets/images/IMG_5991.png'
    },
  ];
  imageRetObject: Array<object> = [
    {
      image: '/assets/images/IMG_5951.jpg',
      thumbImage: '/assets/images/IMG_5951.jpg'
    },
    {
      image: '/assets/images/IMG_5948.jpg',
      thumbImage: '/assets/images/IMG_5948.jpg'
    },
    {
      image: '/assets/images/IMG_5949.jpg',
      thumbImage: '/assets/images/IMG_5949.jpg'
    },
    {
      image: '/assets/images/IMG_5947.jpg',
      thumbImage: '/assets/images/IMG_5947.jpg'
    },
  ];
  imageBarnObject: Array<object> = [
    {
      image: '/assets/images/IMG_5967.jpg',
      thumbImage: '/assets/images/IMG_5967.jpg'
    },
    {
      image: '/assets/images/IMG_5968.png',
      thumbImage: '/assets/images/IMG_5968.png'
    },
    {
      image: '/assets/images/IMG_5969.png',
      thumbImage: '/assets/images/IMG_5969.png'
    },
    {
      image: '/assets/images/IMG_5970.png',
      thumbImage: '/assets/images/IMG_5970.png'
    },
    {
      image: '/assets/images/IMG_5971.png',
      thumbImage: '/assets/images/IMG_5971.png'
    },
    {
      image: '/assets/images/IMG_5972.png',
      thumbImage: '/assets/images/IMG_5972.png'
    },
    {
      image: '/assets/images/IMG_5980.png',
      thumbImage: '/assets/images/IMG_5980.png'
    },
    {
      image: '/assets/images/IMG_5981.png',
      thumbImage: '/assets/images/IMG_5981.png'
    },
  ];
  imageGradeObject: Array<object> = [
    {
      image: '/assets/images/IMG_5940.jpg',
      thumbImage: '/assets/images/IMG_5940.jpg'
    },
    {
      image: '/assets/images/IMG_5956.jpg',
      thumbImage: '/assets/images/IMG_5956.jpg'
    },
    {
      image: '/assets/images/IMG_5957.jpg',
      thumbImage: '/assets/images/IMG_5957.jpg'
    },
    {
      image: '/assets/images/IMG_5959.jpg',
      thumbImage: '/assets/images/IMG_5959.jpg'
    },
  ];
  imageGateObject: Array<object> = [
    {
      image: '/assets/images/IMG_5945.jpg',
      thumbImage: '/assets/images/IMG_5945.jpg'
    },
    {
      image: '/assets/images/IMG_5943.jpg',
      thumbImage: '/assets/images/IMG_5943.jpg'
    },
    {
      image: '/assets/images/IMG_5999.jpg',
      thumbImage: '/assets/images/IMG_5999.jpg'
    },
  ];
}
