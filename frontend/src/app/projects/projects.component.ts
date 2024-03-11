import { Component} from '@angular/core';
import { MaterialModule } from '../material-module';
import { CommonModule } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MaterialModule, CommonModule, NgImageSliderModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent{
  imageAgriObject: Array<object> = [
{
    image: '/assets/images/IMG_5977.png',
    thumbImage: '/assets/images/IMG_5977.png'
},
{
  image: '/assets/images/IMG_5978.png',
  thumbImage: '/assets/images/IMG_5978.png'
},
{
  image: '/assets/images/IMG_5979.png',
  thumbImage: '/assets/images/IMG_5979.png'
},
{
  image: '/assets/images/IMG_5982.png',
  thumbImage: '/assets/images/IMG_5982.png'
},
{
  image: '/assets/images/IMG_5987.png',
  thumbImage: '/assets/images/IMG_5987.png'
},
];
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
