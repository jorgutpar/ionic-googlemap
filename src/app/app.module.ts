import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { RegisterPage } from '../pages/register/register';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Facebook } from '@ionic-native/facebook'
import { MapsData } from '../providers/mapsdata'
import { HttpModule } from '@angular/http';

const cloudSettings: CloudSettings = {
  'core':{
    'app_id': '62e0da3a'
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    MapsData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
