import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatWind'
})
export class FormatWindPipe implements PipeTransform {


  transform(wind): string {
    const windParams = [
      'menos de 1.08 km/h (Calma)',
      '1.08~12.24 km/h (Ligero)',
      '12.24~28.80 km/h (Moderado)',
      '28.8~38.88 km/h (Fresco)',
      '38.88~61.92 km/h (Fuerte)',
      '61.92~88.2 km/h (Vendaval)',
      '88.2~117.36 km/h (Tormenta)',
      'Más de 117.36 km/h (Huracán)',
    ];
    
    const windName = windParams[wind-1];
    return windName;
  }

}
