import { Resume } from "./Resume";

// src/app/models/resume-filter.model.ts
export interface ResumeAnalysis {
  id: number;
  resume_id: Resume;
  matchPercentage: number;
  analysizedTime : Date
  topMatchingSkills: string[];
  suggestions : string[];
  analysis: string;
  interviewDate: string;
  interviewTime: string;
  interviewMode: string;
  selectedStatus: string;
}

