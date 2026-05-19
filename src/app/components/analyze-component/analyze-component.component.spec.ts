import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeComponentComponent } from './analyze-component.component';

describe('AnalyzeComponentComponent', () => {
  let component: AnalyzeComponentComponent;
  let fixture: ComponentFixture<AnalyzeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyzeComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
