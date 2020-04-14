import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'space' })

export class CharToSpacePipe implements PipeTransform {
  transform(value: string) {
    return value.replace("-", " ");
  }
}
