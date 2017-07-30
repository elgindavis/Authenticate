import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public googlePlus: GooglePlus, public afDatabase: AngularFireDatabase, public facebook: Facebook) {}

  
   getUser():firebase.User {
      return this.afAuth.auth.currentUser;
   }

   googleLogin(): Promise<any> {
    return this.googlePlus.login({
      'webClientId': '809778044945-roi5n89efs8k7h96i766i1ev0jfsdmlp.apps.googleusercontent.com',
      'offline': true
    })
    .then( res => {
      const credential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
      
      this.afAuth.auth.signInWithCredential(credential)
        .then( success => { console.log("Firebase success: " + JSON.stringify(success)); })
        .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
      })
    .catch(err => console.error("Error: ", err));
  }

  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        this.afAuth.auth.signInWithCredential(facebookCredential)
        .then((success) => { console.log("Firebase success: " + JSON.stringify(success)); })
        .catch((error) => { console.log("Firebase failure: " + JSON.stringify(error)); });

      })
      .catch((error) => { console.log(error) });
  }

  /**
   * loginUser takes in an email and password and signs the user into the application.
   */
   
  loginUser(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * signupUser takes in an email and password and does 3 things:
   * 1. It creates the new user.
   * 2. It signs the user into the application.
   * 3. It creates a database node for the user to store the userProfile, which starts with just
   *    the email address.
   */

  signupUser(email: string, password: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.afDatabase.object(`/userProfile/${newUser.uid}`).set({
          email: email
      });
    });
  }

  /**
   * resetPassword takes the email address as a string and sends the email with the reset password 
   * link.
   */
  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  /**
   * logoutUser doesn't take any parameters, it looks into the authentication object and signs out
   * the currently logged in user.
   */
  logoutUser(): firebase.Promise<void> {
     firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid).off();
    return this.afAuth.auth.signOut();
  }

}
