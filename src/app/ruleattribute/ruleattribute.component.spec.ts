import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleattributeComponent } from './ruleattribute.component';

describe('RuleattributeComponent', () => {
  let component: RuleattributeComponent;
  let fixture: ComponentFixture<RuleattributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleattributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleattributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
