import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Dashboard } from 'src/app/models/Dashboard';
import { UploadresumeService } from 'src/app/services/uploadresume.service';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnChanges {
    @Input() dashboard?: Dashboard;
    stats: any[] = [];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
     if (this.dashboard) {
      this.stats = [
        { name: 'Total Resumes', value: this.dashboard.totalResumes, change: 12, icon: 'resume' },
        { name: 'Candidates Screened', value: this.dashboard.canditateScanned, change: 8, icon: 'candidate' },
        { name: 'Best Match', value: this.dashboard.bestMatch + '%', change: 3, icon: 'match' },
        { name: 'Avg. Experience', value: this.dashboard.averageExperience, change: -1, icon: 'experience' }
      ];
    }
  }

 
 

}
