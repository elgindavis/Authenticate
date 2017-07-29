import { Component } from '@angular/core';
import { 
  IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm:FormGroup;  
  public loading:Loading;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public formBuilder: FormBuilder,
    public authProvider: AuthProvider, public googlePlus: GooglePlus, public facebook: Facebook, public afAuth: AngularFireAuth) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();          
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  goToSignup(){
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(){
    this.navCtrl.push('PasswordResetPage');
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
}
