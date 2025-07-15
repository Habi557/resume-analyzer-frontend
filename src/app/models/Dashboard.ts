import { ResumeAnalysis } from "./ResumeAnalysis";

export interface Dashboard {
       totalResumes: number;
       canditateScanned: number;
       bestMatch: number;
       averageExperience: number;
       resumeAnalysisEntity: ResumeAnalysis;
}