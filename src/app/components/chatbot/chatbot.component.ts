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
  loading: boolean = false;
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
    this.loading = true;

    // Fake AI response (replace with real AI integration)
    this.chatService.callAi(userQuery).subscribe({
      next: (response) => {
        // Add bot response
        this.messages.push({ text: response, sender: 'bot' });
        this.loading = false;

      },
      error: (error) => {
        this.loading = false;
        this.messages.push({ text: 'Error processing your request. Please try again.', sender: 'bot' });

      }
    });
  }

  generateBotResponse(query: string): string {
    if (query.includes('java') && query.includes('5')) {
      return 'Here are top Java developers with 5+ years experience.';
    }
    return 'Sorry, I could not understand that. Try asking about skills or experience.';
  }



}
