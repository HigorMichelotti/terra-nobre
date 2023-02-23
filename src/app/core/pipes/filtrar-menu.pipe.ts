import { Pipe, PipeTransform } from '@angular/core';
import { NavigationItem } from '../components/layout/admin/navigation/navigation-default';

@Pipe({
  name: 'filtrarMenu'
})
export class FiltrarMenuPipe implements PipeTransform {

  transform(items: NavigationItem[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}
