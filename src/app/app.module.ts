import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { DateToDayNamePipe } from './pipes/date-to-day-name.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatWindPipe } from './pipes/format-wind.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailComponent,
    DateToDayNamePipe,
    FormatDatePipe,
    FormatWindPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
