import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTestComponent } from './element-test.component';

describe('ElementTestComponent', () => {
  let component: ElementTestComponent;
  let fixture: ComponentFixture<ElementTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
