import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleattachmentComponent } from './ruleattachment.component';

describe('RuleattachmentComponent', () => {
  let component: RuleattachmentComponent;
  let fixture: ComponentFixture<RuleattachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleattachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleattachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
