import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgButtonLibComponent } from './ng-button-lib.component';

describe('NgButtonLibComponent', () => {
  let component: NgButtonLibComponent;
  let fixture: ComponentFixture<NgButtonLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgButtonLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgButtonLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
