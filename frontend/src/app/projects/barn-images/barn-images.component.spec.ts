import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarnImagesComponent } from './barn-images.component';

describe('BarnImagesComponent', () => {
  let component: BarnImagesComponent;
  let fixture: ComponentFixture<BarnImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarnImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarnImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
