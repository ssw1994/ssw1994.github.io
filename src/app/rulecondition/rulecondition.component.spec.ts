import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleconditionComponent } from './rulecondition.component';

describe('RuleconditionComponent', () => {
  let component: RuleconditionComponent;
  let fixture: ComponentFixture<RuleconditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleconditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleconditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
