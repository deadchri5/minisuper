import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlideCarouselComponent } from './glide-carousel.component';

describe('GlideCarouselComponent', () => {
  let component: GlideCarouselComponent;
  let fixture: ComponentFixture<GlideCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlideCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlideCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
