import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewofproductComponent } from './viewofproduct.component';

describe('ViewofproductComponent', () => {
  let component: ViewofproductComponent;
  let fixture: ComponentFixture<ViewofproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewofproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewofproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
