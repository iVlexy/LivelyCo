import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialImagesComponent } from './residential-images.component';

describe('ResidentialImagesComponent', () => {
  let component: ResidentialImagesComponent;
  let fixture: ComponentFixture<ResidentialImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResidentialImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
