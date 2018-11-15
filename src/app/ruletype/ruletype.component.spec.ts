import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuletypeComponent } from './ruletype.component';

describe('RuletypeComponent', () => {
  let component: RuletypeComponent;
  let fixture: ComponentFixture<RuletypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuletypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuletypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
