import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private LOCATION_API = "https://freegeoip.app/json/";

  constructor() { }

  async getGPSLocation(){
    const requestOptions = {
      enableHighAccuracy: true, // Alta precisión
      maximumAge: 0, // No queremos caché
      timeout: 5000 // Esperar solo 5 segundos
    };

    const onLocationGranted = ubicacion => {
      const coordenadas = ubicacion.coords;
      return coordenadas;
    }

    const onLocationError = err => {
      console.log(err);
    }
    return new Promise<any>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(Error('No soportado'));
        return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
      }

      navigator.geolocation.getCurrentPosition((location) => {
        const position = location.coords;
        resolve(position)
      }, (locationError) => {
        const err = locationError;
        reject(err);
      },requestOptions);
    });

  }

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

  formatDateMDY(value: any) {
    value = "" + value;
    if (!value) {
      return "";
    }
    
    let year = value.substring(0,4);
    let month = value.substring(4,6);
    let day = value.substring(6,8);
    
    return month + "-" + day + "-" + year;
  }
}
