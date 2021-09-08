import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private LOCATION_API = "https://freegeoip.app/json/";

  constructor() { }

  async getLocationData(){
    const response = await fetch(this.LOCATION_API);
    return await response.json();
  }

  async getWeatherData(longitude: string, latitude: string) {
    const response = await fetch(`http://www.7timer.info/bin/civillight.php?lon=${longitude}&lat=${latitude}&ac=0&unit=metric&output=json`);
    return await response.json();
  }

  formatDate(value: any) {
    value = "" + value;
    if (!value) {
      return "";
    }

    let year = value.substring(0,4);
    let month = value.substring(4,6);
    let day = value.substring(6,8);
    return day + "-" + month + "-" + year;
  }
}
