import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';


@Pipe({
  name: 'dateClock',
  standalone: true
})
export class DateClockPipe implements PipeTransform {

  transform(date: string): string {
    const dateNow = DateTime.local();

    const dateOffset = DateTime.local().offset /60;

    const postDate = DateTime.fromISO(date).toUTC();

    const diffDate = dateNow.diff(postDate).as('hours');

    const dateFloor = Math.floor(diffDate) - dateOffset;

    if (dateFloor <= 1) {
      return 'Менее часа назад';
    }

    if (dateFloor < 5 && dateFloor > 1 ) {
      return `${dateFloor} часа назад`;
    }

    if (dateFloor > 24) {
      return 'Более одного дня';
    }

    if (dateFloor > 48) {
      return 'Давно';
    }

    return `${dateFloor} часов назад`;
  }

}
