import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptumFormComponent } from './receptum-form.component';

describe('ReceptumFormComponent', () => {
  let component: ReceptumFormComponent;
  let fixture: ComponentFixture<ReceptumFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
