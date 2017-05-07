import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMaps, LatLng, GoogleMapsEvent, CameraPosition, Marker, MarkerOptions} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public map: GoogleMap;
	public mapRendered: Boolean = false;

  constructor(public navCtrl: NavController, public platform: Platform) {
  	this.platform.ready().then(() => {
  		this.showMap();
  	})
  }

  showMap(){
  	let location = new LatLng(47.6062,-122.3321);
  	this.map = new GoogleMap('map',{
  		'camera': {
  			'latLng': location,
  			'tilt': 30,
  			'zoom': 15,
  			'bearing': 50
  		}
  	});

  	this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
  		this.mapRendered=true;
  	});
  }

  getMyLocation(){
    console.log("Getting location");
  	this.map.getMyLocation().then((location) => {
      console.log(location);
  		var msg = [
  			"I am here:\n",
  			"latitute:" + location.latLng.lat,
  			"longitude:" + location.latLng.lng].join("\n");

  			let position: CameraPosition = {
  				target: location.latLng,
  				zoom: 15
  			};
  			this.map.moveCamera(position);
  			let markerOptions: MarkerOptions = {
  				'position': location.latLng,
  				'title': msg
  			};
  			this.map.addMarker(markerOptions).then((
  				marker: Marker) => {
  					marker.showInfoWindow();
  			}
        );
  	}, (err) => {
          console.log(err);
          alert(err.error_message);
    });
  }



}
