import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// We import the authentication provider to test the log-out function.
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfileProvider } from '../../providers/profile/profile';
import { ProfilePage } from '../profile/profile';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public userProfile:firebase.database.Reference;
public currentUser:firebase.User;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
     
    firebase.auth().onAuthStateChanged( user => {
       if (user) {
      this.currentUser = user;
        
       user.providerData.forEach(function (profile) {
         console.log("Sign-in provider: "+profile.providerId);
         console.log("  Provider-specific UID: "+profile.uid);
         console.log("  Name: "+profile.displayName);
         console.log("  Email: "+profile.email);
         console.log("  Photo URL: "+profile.photoURL); })
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
      window.localStorage.removeItem("firebase:session::<host-name>");
    });}

  goToProfile(){ 
    this.navCtrl.push('profile'); 
  }

  goToPage(page){
    this.navCtrl.push(page);
  }

  goToList(){
    this.navCtrl.push('list');
  }

}