import { Component } from '@angular/core';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Edd Weather';

  loading = false;
  city = "";
  region_name = "";
  country_name = "";
  country_code = "";
  time = "";
  detailsToday = {};
  detailsNext = [];

  constructor(private weatherService: WeatherService) {

  }

  startClock() {
    const _this = this;
    setInterval(() => {
      let time = "";
      let date = new Date();
      let times = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let timeFixed = times.toString();
      if (times < 10) {
        timeFixed = "0" + timeFixed;
      }
      let minutesFixed = minutes.toString();
      if (minutes < 10) {
        minutesFixed = "0" + minutesFixed;
      }
      let secondsFixed = seconds.toString();
      if (seconds < 10) {
        secondsFixed = "0" + secondsFixed;
      }
      let meridian = date.getHours() > 12 ? "p.m" : "a.m";
      _this.time = `${timeFixed}:${minutesFixed}:${secondsFixed} ${meridian}`;
    }, 500);
  }

  async ngOnInit() {
    // Hacer que se muestre el indicador de carga
    this.loading = true;
    // Obtener los datos de GPS
    const gpsData = await this.weatherService.getGPSLocation();
    // console.log(gpsData);
    let { latitude, longitude } = gpsData;
    // Obtener los datos de ubicación
    const locationData = await this.weatherService.getLocationData();
    this.city = locationData.city;
    this.region_name = locationData.region_name;
    this.country_name = locationData.country_name;
    this.country_code = locationData.country_code;
    if ( (latitude == undefined) && (longitude == undefined) ){
      latitude = locationData.latitude;
      longitude = locationData.longitude;
    }
    // const { latitude, longitude } = locationData;
    // Obtener, ahora, los datos del clima
    const weatherData = await this.weatherService.getWeatherData(longitude, latitude);
    // Cortamos el arreglo para mostrar la de hoy, y también las siguientes
    this.detailsToday = weatherData.dataseries.slice(0, 1)[0];
    this.detailsNext = weatherData.dataseries.slice(1, 7);

    // Ocultamos el indicador de carga y comenzamos el reloj
    this.loading = false;
    this.startClock();
  }
}
