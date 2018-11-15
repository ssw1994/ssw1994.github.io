import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesStepComponent } from './rules-step.component';

describe('RulesStepComponent', () => {
  let component: RulesStepComponent;
  let fixture: ComponentFixture<RulesStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
