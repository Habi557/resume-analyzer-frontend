import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdateformat'
})
export class CustomdateformatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
