import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannercovidComponent } from './bannercovid.component';

describe('BannercovidComponent', () => {
  let component: BannercovidComponent;
  let fixture: ComponentFixture<BannercovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannercovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannercovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
