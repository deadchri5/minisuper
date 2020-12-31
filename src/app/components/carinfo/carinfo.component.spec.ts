import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarinfoComponent } from './carinfo.component';

describe('CarinfoComponent', () => {
  let component: CarinfoComponent;
  let fixture: ComponentFixture<CarinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
