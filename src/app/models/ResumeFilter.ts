// src/app/models/resume-filter.model.ts
export interface ResumeFilter {
  id: number;
  resume_id: any;
  education: any;
  name: string;
  matchPercentage: number;
  yearsOfExperience: number
  extractedSkills: string[];
  address: string;
  analysizedTime : Date
  topMatchingSkills: string[];
  suggestions : string[];
  analysis: string;
  email: string;
  phone: string;
  redFlags: string[];
  interviewDate: string;
  interviewTime: string;
  interviewMode: string;
  selectedStatus: string;



  // totalResumes: number;
  // canditateScanned: number;
  // bestMatch: number;
  // averageExperience: number;
}

