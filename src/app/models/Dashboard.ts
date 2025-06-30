import { ResumeFilter } from "./ResumeFilter";

export interface Dashboard {
       totalResumes: number;
       totalResumePercentage: number;
       canditateScanned: number;
       totalCanditatePercentage: number;
       bestMatch: number;
       averageExperience: number;
       resumeAnalysisEntity: ResumeFilter;
}