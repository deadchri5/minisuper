import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSearchViewComponent } from './results-search-view.component';

describe('ResultsSearchViewComponent', () => {
  let component: ResultsSearchViewComponent;
  let fixture: ComponentFixture<ResultsSearchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsSearchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
