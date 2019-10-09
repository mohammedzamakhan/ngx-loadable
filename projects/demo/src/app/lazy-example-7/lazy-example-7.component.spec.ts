import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyExample7Component } from './lazy-example-7.component';

describe('LazyExample7Component', () => {
  let component: LazyExample7Component;
  let fixture: ComponentFixture<LazyExample7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyExample7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyExample7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
