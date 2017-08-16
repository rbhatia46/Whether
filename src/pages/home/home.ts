import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import {Storage} from '@ionic/storage';  

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather:any;
  location:{
    city:string,
    state:string
  }
  constructor(
    public navCtrl: NavController, 
    private weatherProvider:WeatherProvider,
    private storage:Storage) { // To inject as a dependency you need to pass this in the constructor

  }

  ionViewWillEnter(){ // Similar to ngOnInit()
      this.storage.get('location').then((val) => {
        if(val!=null){
          this.location = JSON.parse(val);
        }else{
            this.location={
      city : 'Indore',
      state: 'India'
    }
        }

this.weatherProvider.getWeather(this.location.city,this.location.state).subscribe(weather => {
      //console.log(weather);  JUST FOR TESTING PURPOSE
      this.weather = weather.current_observation;
    });

      }); 
  }

}
