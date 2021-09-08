import { Pipe, PipeTransform } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Pipe({
  name: 'dateToDayName'
})
export class DateToDayNamePipe implements PipeTransform {

  constructor(
    private weatherService: WeatherService
  ){}

  transform(dateAsString): string {
    dateAsString = this.weatherService.formatDate(dateAsString) + " 00:00:00";
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];
    const dayNumber = new Date(dateAsString).getDay();
    const dayName = days[dayNumber];
    return dayName;
  }

}
