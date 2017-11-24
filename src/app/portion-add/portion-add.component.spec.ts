import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortionAddComponent } from './portion-add.component';

describe('PortionAddComponent', () => {
  let component: PortionAddComponent;
  let fixture: ComponentFixture<PortionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
