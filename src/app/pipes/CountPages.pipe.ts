import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'countPages' })
export class CountPagesPipe implements PipeTransform {
  transform(total: number, divider: number): number[] {
    if (divider > 0) {
      const totalPages = Math.ceil(total / divider);
      return [...Array(totalPages + 1).keys()].slice(1);
    } else return [0];
  }
}
