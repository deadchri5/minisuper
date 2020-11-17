import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesertitemComponent } from './desertitem.component';

describe('DesertitemComponent', () => {
  let component: DesertitemComponent;
  let fixture: ComponentFixture<DesertitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesertitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesertitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
