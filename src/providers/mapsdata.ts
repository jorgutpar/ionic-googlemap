import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MapsData {
	private _maps$: any;
	private _wholeDB: any;
	private _mapsRef: any;

  constructor(public http: Http) {
    console.log('Hello Maps Provider');
    this._wholeDB = firebase.database().ref('/');
    this._mapsRef = firebase.database().ref('todos');
	this._mapsRef.on('child_added', this.handleData, this); 
	this._maps$ = new ReplaySubject();
  }
	get maps() { 
		return this._maps$; 
	} 
	
	handleData(snap) { 
		try { 
			// Tell our observer we have new data
			this._maps$.next(snap.val()); 
		} catch (error) { 
			console.log('catching', error); 
		} 
	}

	save(mapData)
	{
	   return this._mapsRef.push(mapData).key;
	}
	
}
