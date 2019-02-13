import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomComponent } from './bottom.component';

describe('BottomComponent', () => {
  let component: BottomComponent;
  let fixture: ComponentFixture<BottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
