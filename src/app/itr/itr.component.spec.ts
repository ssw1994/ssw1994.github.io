import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ITRComponent } from './itr.component';

describe('ITRComponent', () => {
  let component: ITRComponent;
  let fixture: ComponentFixture<ITRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ITRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ITRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
