import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesWrapComponent } from './categories-wrap.component';

describe('CategoriesWrapComponent', () => {
  let component: CategoriesWrapComponent;
  let fixture: ComponentFixture<CategoriesWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
