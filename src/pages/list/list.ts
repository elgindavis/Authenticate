import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
	{
  	name: 'list'
	})

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
	arrData = []
	myInput
	public currentUser:firebase.User;

    constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
	  firebase.auth().onAuthStateChanged( user => {
	  if (user) {
      this.currentUser = user;
      this.fdb.list("/myItems/").subscribe(_data => {
	  this.arrData = _data;
		console.log(this.arrData);  
		user.providerData.forEach(function (profile) {
		console.log("Sign-in provider: "+profile.providerId);
		console.log("  Provider-specific UID: "+profile.uid);
		console.log("  Name: "+profile.displayName);
		console.log("  Email: "+profile.email);
		console.log("  Photo URL: "+profile.photoURL); });
		
      });			}
  

        else {
         console.log("There's no user here");
      	}
	  
	  });}	

	btnAddClicked(){
		this.fdb.list("/myItems/").push(this.myInput)
	}	

	delete(i){
		this.fdb.list("/myItems/").remove(this.arrData[i].$key);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
