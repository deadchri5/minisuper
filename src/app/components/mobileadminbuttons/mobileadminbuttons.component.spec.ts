import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileadminbuttonsComponent } from './mobileadminbuttons.component';

describe('MobileadminbuttonsComponent', () => {
  let component: MobileadminbuttonsComponent;
  let fixture: ComponentFixture<MobileadminbuttonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileadminbuttonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileadminbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
