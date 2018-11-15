import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuletestComponent } from './ruletest.component';

describe('RuletestComponent', () => {
  let component: RuletestComponent;
  let fixture: ComponentFixture<RuletestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuletestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuletestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
