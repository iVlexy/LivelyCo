import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateImagesComponent } from './gate-images.component';

describe('GateImagesComponent', () => {
  let component: GateImagesComponent;
  let fixture: ComponentFixture<GateImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GateImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
