import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGComponent } from './map-g.component';

describe('MapGComponent', () => {
  let component: MapGComponent;
  let fixture: ComponentFixture<MapGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
