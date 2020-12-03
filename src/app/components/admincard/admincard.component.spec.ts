import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincardComponent } from './admincard.component';

describe('AdmincardComponent', () => {
  let component: AdmincardComponent;
  let fixture: ComponentFixture<AdmincardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
