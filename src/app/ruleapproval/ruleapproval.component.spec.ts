import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleapprovalComponent } from './ruleapproval.component';

describe('RuleapprovalComponent', () => {
  let component: RuleapprovalComponent;
  let fixture: ComponentFixture<RuleapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
