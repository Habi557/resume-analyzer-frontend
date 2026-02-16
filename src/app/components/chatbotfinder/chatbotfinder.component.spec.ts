import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotfinderComponent } from './chatbotfinder.component';

describe('ChatbotfinderComponent', () => {
  let component: ChatbotfinderComponent;
  let fixture: ComponentFixture<ChatbotfinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotfinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
