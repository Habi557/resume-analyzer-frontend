import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllResumesComponent } from './show-all-resumes.component';

describe('ShowAllResumesComponent', () => {
  let component: ShowAllResumesComponent;
  let fixture: ComponentFixture<ShowAllResumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllResumesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
