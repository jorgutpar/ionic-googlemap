import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { GoogleMap, LatLng, GoogleMapsEvent, MyLocation, CameraPosition, Marker, MarkerOptions} from '@ionic-native/google-maps';
import { MapsData } from '../../providers/mapsdata'
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})



export class MapPage {
	public map: GoogleMap;
	public mapRendered: Boolean = false;
  public location: LatLng;
  public myLocation: MyLocation;





  constructor(public navCtrl: NavController, 
              public platform: Platform, 
              public loadingCtrl: LoadingController, 
              public toastCtrl: ToastController, 
              public mapsData: MapsData ) {
    	this.platform.ready().then(() => {
    		this.getMyLocation();
    	})
  }

  showMap(){
    this.mapRendered=true;
    let position: CameraPosition = {
      target: this.myLocation.latLng,
      zoom: 15
    };
    this.map.moveCamera(position);
    let markerOptions: MarkerOptions = {
      'position': this.myLocation.latLng
    };
    let toast = this.toastCtrl.create({
      message: 'Location found, search for anything',
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  getMyLocation(){
    this.map = new GoogleMap('map');

    console.log("Getting location");
    let loader = this.loadingCtrl.create({
      content: "Getting location ... please wait."
    });

    loader.present();
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        	this.map.getMyLocation().then((location) => {
            console.log(location);
            this.myLocation = location;
            this.showMap();
            loader.dismiss();
        	}, (err) => {
                loader.dismiss();
                console.log(err);
                alert(err.error_message);
          });
    }, (err) => {
            loader.dismiss();
            console.log("Error in MAP_READY event");
            console.log(err);
            alert(err.error_message);
      });

    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((mapClick) => {
      console.log(mapClick);
    }, (err) => {
      console.log(err);
    });

   }
  
  
}


class MyMarker { 
  public message: string;
  public pinned: boolean; 
  public lat: any;
  public lng: any;

  constructor() { 
    this.message = ''; 
    this.pinned = false; 
    this.lat=0;
    this.lng=0;
  } 
}