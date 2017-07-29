import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public authProvider: AuthProvider) {}

  ionViewDidLoad() {
    this.userProfile = this.authProvider.getUser();
  }

}