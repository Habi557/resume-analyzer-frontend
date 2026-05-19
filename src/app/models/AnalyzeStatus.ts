export interface AnalyzeStatus {
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  processedResume: number;
  totalResume: number;
  failedResume: number
}