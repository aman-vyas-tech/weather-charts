import { WeatherService } from './../weather.service';
import { Component, OnInit } from '@angular/core';
import * as CanvasJS  from './../../assets/canvasjs.min';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  public weatherData : any;
  public chartData : any;
  public filterData = [];
  dataSource: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
     this.weatherService.getWeatherData().subscribe(data => {
      this.weatherData = data;
      this.weatherData = this.weatherData.slice(0, 50);
      this.weatherData = this.weatherData.filter(item => {
        return item.Humidity > 70;
      });
      // this.dataSource = this.weatherData;
      // const displayedColumns = ['humidity', 'Sensor_Location', 'Solar_Radiation', 'Wind_Speed'];
      // console.log(this.weatherData);
     this.chartData = Object.entries(this.weatherData);
     this.chartData.forEach(item => {
       this.filterData.push({y: +item[1].Humidity, label: item[1].Measurement_ID})
     });
     this.showChart();
     console.log(this.filterData);
    });

    
  }

  showChart() {

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Humidity Count of top 15 Sensor Location Greater than 50"
      },
      data: [{
        type: "column",
        dataPoints: this.filterData
      }]
    });
      
    chart.render();
      }
  }


