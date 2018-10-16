import { Component, Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (!items || !value) {
      return items;
    }
    return items.filter(e => {
      if (e.payload)
        return e.payload.val().name.toLowerCase().includes(value.toLocaleLowerCase());
      else
        return e.name.toLowerCase().includes(value.toLocaleLowerCase());
    });
  }
}