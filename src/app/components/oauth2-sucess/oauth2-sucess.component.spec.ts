import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oauth2SucessComponent } from './oauth2-sucess.component';

describe('Oauth2SucessComponent', () => {
  let component: Oauth2SucessComponent;
  let fixture: ComponentFixture<Oauth2SucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Oauth2SucessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oauth2SucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
