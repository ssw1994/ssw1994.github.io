import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulefiltersComponent } from './rulefilters.component';

describe('RulefiltersComponent', () => {
  let component: RulefiltersComponent;
  let fixture: ComponentFixture<RulefiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulefiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulefiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
