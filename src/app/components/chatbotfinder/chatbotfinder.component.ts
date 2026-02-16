import { Component, Input } from '@angular/core';
import { ResumeAnalysis } from 'src/app/models/ResumeAnalysis';

@Component({
  selector: 'app-chatbotfinder',
  templateUrl: './chatbotfinder.component.html',
  styleUrls: ['./chatbotfinder.component.scss']
})
export class ChatbotfinderComponent {
  @Input() resumeAnalysis!: ResumeAnalysis[];

}
