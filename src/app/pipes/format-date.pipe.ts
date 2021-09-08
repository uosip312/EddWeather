import { Pipe, PipeTransform } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  constructor(
    private weatherService: WeatherService
  ){}

  transform(value: string): string {
    return this.weatherService.formatDate(value);
  }

}
