import { CdkDrag, DragRef, Point } from '@angular/cdk/drag-drop';
import { Component, computed, ElementRef, viewChildren } from '@angular/core';

@Component({
  selector: 'app-agriculture-images',
  standalone: true,
  imports: [
    CdkDrag
  ],
  templateUrl: './agriculture-images.component.html',
  styleUrl: './agriculture-images.component.scss'
})
export class AgricultureImagesComponent {
  images = viewChildren<ElementRef<HTMLImageElement>>('img');
  lastImageSize = computed(() => {
    const images = this.images();
    return images[images.length - 1].nativeElement?.getBoundingClientRect?.()?.width
  });
  boundarySize = computed(() => {
    let width = 0;
    this.images().map(image => {
      return image.nativeElement?.getBoundingClientRect?.()?.width;
    })
      .forEach(w => width += w);

    return width;
  });

  constrain(userPointerPosition: Point, dragRef: DragRef, dimensions: DOMRect, pickupPositionInElement: Point): Point {
    console.log({ userPointerPosition, dragRef, dimensions, pickupPositionInElement });
    return { x: 0, y: 0 };
  }
}
