import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingImagesComponent } from './grading-images.component';

describe('GradingImagesComponent', () => {
  let component: GradingImagesComponent;
  let fixture: ComponentFixture<GradingImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradingImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradingImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
