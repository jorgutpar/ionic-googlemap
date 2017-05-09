import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { GooglePlus } from 'ionic-native';
import { MapPage } from '../map/map';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public username: string = "";
  public password: string = "";
  public name: string = "";
  public birthday: string = "";
  public mapPage: any = MapPage;

  constructor(public navCtrl: NavController, public auth: Auth, public user: User, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.initProfile();
  }

  private initProfile() {
    if(this.auth.isAuthenticated()){
      this.name = this.user.get('name','');
      this.birthday = this.user.get('birthday','');
    }
  }

  back(){
    this.navCtrl.push(HomePage);
  }

  doRegister(){

  }

  register(){
    let details: UserDetails = {
      'username': this.username,
      'password': this.password
    };
    let loader = this.loadingCtrl.create({
      content: "Registering user..."
    });

    loader.present();
    this.auth.signup(details).then(() => {
      loader.dismiss();
      return this.auth.login('basic', {'username': this.username,
      'password': this.password});
    }, (err: IDetailedError<string[]>) => {
        loader.dismiss();
        for (let e of err.details){
          if(e === 'conflict_email') {
            alert('Email already exists.');
          } else {
            alert('User already exists.');
          }
        }
      });
  }

  login(){
    let details: UserDetails = {'username': this.username, 'password': this.password};
    let loader = this.loadingCtrl.create({
      content: "Loggin in user..."
    });
    loader.present();

    this.auth.login('basic', details).then((data) => {
      this.initProfile();
      loader.dismiss();
      //this.navCtrl.push(this.mapPage);
    }, (err) => {
      loader.dismiss();
      alert('Login Error');
    });


  }



  save(){
    let toast = this.toastCtrl.create({
      message: 'User profile was save successfully',
      position: 'bottom',
      duration: 3000
    });

    toast.present();
    this.user.set('name', this.name);
    this.user.set('birthday', this.birthday);
    this.user.save();
  }



  logout(){
    this.auth.logout();
    this.username = '';
    this.name = '';
    this.birthday = '';
    this.password = '';
  }


  gLogin(){
 
        GooglePlus.login({
          'webClientId': '829980794249-vhiv4do759tutlacrna5eo1sil6rtasd.apps.googleusercontent.com'
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
 
    }

    gLogout(){
 
        GooglePlus.logout().then(() => {
            console.log("logged out");
        });
 
    }

}
