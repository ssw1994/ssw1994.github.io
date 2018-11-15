import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgGallaryComponent } from './img-gallary.component';

describe('ImgGallaryComponent', () => {
  let component: ImgGallaryComponent;
  let fixture: ComponentFixture<ImgGallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgGallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
