import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    var config = {
    apiKey: "AIzaSyAcCgnwi121Of0b-2EC99laqyGDPkrqRTM",
    authDomain: "zeta-526ed.firebaseapp.com",
    databaseURL: "https://zeta-526ed.firebaseio.com",
    projectId: "zeta-526ed",
    storageBucket: "zeta-526ed.appspot.com",
    messagingSenderId: "829980794249"
  };
    firebase.initializeApp(config);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

