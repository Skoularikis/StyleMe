import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
 name: 'orderByPipe'
})
export class OrderByPipe implements PipeTransform{

 transform(array: Array<string>, args: string): Array<string> {
console.log(array)
  if(!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.created_at < b.created_at) {
        return -1;
      } else if (a.created_at > b.created_at) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
