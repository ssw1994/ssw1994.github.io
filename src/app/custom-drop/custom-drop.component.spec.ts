import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDropComponent } from './custom-drop.component';

describe('CustomDropComponent', () => {
  let component: CustomDropComponent;
  let fixture: ComponentFixture<CustomDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
