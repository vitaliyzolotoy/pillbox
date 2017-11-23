import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortionsComponent } from './portions.component';

describe('PortionsComponent', () => {
  let component: PortionsComponent;
  let fixture: ComponentFixture<PortionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
