import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DashToSpace' })
export class DashToSpacePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('-').join(' ');
  }
}
