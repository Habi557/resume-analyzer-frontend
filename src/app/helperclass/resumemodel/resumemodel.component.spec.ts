import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumemodelComponent } from './resumemodel.component';

describe('ResumemodelComponent', () => {
  let component: ResumemodelComponent;
  let fixture: ComponentFixture<ResumemodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumemodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
