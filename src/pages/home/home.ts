import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// We import the authentication provider to test the log-out function.
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public userProfile:any = null;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
     firebase.auth().onAuthStateChanged( user => {
    if (user) {

    user.providerData.forEach(function (profile) {
    document.getElementById("name").innerHTML = "Hi, " +profile.displayName;
//    console.log("Sign-in provider: "+profile.providerId);
//    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
 //   console.log("  Email: "+profile.email);
  //  console.log("  Photo URL: "+profile.photoURL); 
    })
    }

     else {
      console.log("There's no user here");
    }
    });
  }
  
  /**
   * Calls the authentication provider and logs the user out, on successful logout it sends the user
   * back to the login page.
   */
  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });}

 

}