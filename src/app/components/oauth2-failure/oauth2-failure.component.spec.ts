import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oauth2FailureComponent } from './oauth2-failure.component';

describe('Oauth2FailureComponent', () => {
  let component: Oauth2FailureComponent;
  let fixture: ComponentFixture<Oauth2FailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Oauth2FailureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oauth2FailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
