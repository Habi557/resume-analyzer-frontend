import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  isOpen = false;
  chatMessage = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  constructor(private chatService: ChatbotService){}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.chatMessage.trim()) return;

    // Add user message
    this.messages.push({ text: this.chatMessage, sender: 'user' });

    const userQuery = this.chatMessage.toLowerCase();

    // Clear input
    this.chatMessage = '';

    // Fake AI response (replace with real AI integration)
    this.chatService.callAi(userQuery).subscribe({
      next: (response) => {
        debugger;
        // Add bot response
        this.messages.push({ text: response, sender: 'bot' });
      },
      error: (error) => {
        console.error('Error calling AI service:', error);
        this.messages.push({ text: 'Error processing your request. Please try again.', sender: 'bot' });
      }
    });
    // setTimeout(() => {
    //   const response = this.generateBotResponse(userQuery);
    //   this.messages.push({ text: response, sender: 'bot' });
    // }, 600);
  }

  generateBotResponse(query: string): string {
    if (query.includes('java') && query.includes('5')) {
      return 'Here are top Java developers with 5+ years experience.';
    }
    return 'Sorry, I could not understand that. Try asking about skills or experience.';
  }



}
