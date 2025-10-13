import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorchangeForSelectedstatus'
})
export class ColorchangeForSelectedstatusPipe implements PipeTransform {

  transform(status: string): string {
      switch (status?.toLowerCase()) {
      case 'selected':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'interview_scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800'; // default fallback
    }
  }

}
