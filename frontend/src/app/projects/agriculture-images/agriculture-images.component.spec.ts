import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureImagesComponent } from './agriculture-images.component';

describe('AgricultureImagesComponent', () => {
  let component: AgricultureImagesComponent;
  let fixture: ComponentFixture<AgricultureImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricultureImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgricultureImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
