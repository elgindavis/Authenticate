import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
  public alertCtrl: AlertController, public formBuilder: FormBuilder, 
  public authProvider: AuthProvider) {
    
    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required, Validators.maxLength(30)])]
    });
  
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } 

    else {

      console.log(this.signupForm.value.username);
      this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
      console.log(this.signupForm.value.username);
      var user:any = firebase.auth().currentUser;
      
      firebase.auth().currentUser.updateProfile({
        displayName: this.signupForm.value.username,
        photoURL:""
        }).then(function() {
        console.log(user.displayName);
          // Update successful.
        }).catch(function(error) {
          // An error happened.
          console.log('try again');
        });
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(HomePage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

} 

  
      
      
    

