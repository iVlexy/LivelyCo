import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetainingwallImagesComponent } from './retainingwall-images.component';

describe('RetainingwallImagesComponent', () => {
  let component: RetainingwallImagesComponent;
  let fixture: ComponentFixture<RetainingwallImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetainingwallImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetainingwallImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
