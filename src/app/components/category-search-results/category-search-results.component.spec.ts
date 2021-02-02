import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySearchResultsComponent } from './category-search-results.component';

describe('CategorySearchResultsComponent', () => {
  let component: CategorySearchResultsComponent;
  let fixture: ComponentFixture<CategorySearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
