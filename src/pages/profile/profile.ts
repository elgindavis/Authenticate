import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

@IonicPage({
  name: 'profile'
})

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  public userProfile: any;
  public birthDate: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  public profileProvider: ProfileProvider, public authProvider: AuthProvider){}

// end of constructor
// useful functions start here

// assign values from the object to userProfile variable
	ionViewDidEnter() {
	  this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
	    this.userProfile = userProfileSnapshot.val();
	    this.birthDate = userProfileSnapshot.val().birthDate;
	  });
	}

	// log user out
	logOut(){
	  this.authProvider.logoutUser().then(() => {
	    this.navCtrl.setRoot('login');
	  });
	}

	updateName(){
	  let alert = this.alertCtrl.create({
	    message: "Your first name & last name",
	    inputs: [
	      {
	        name: 'firstName',
	        placeholder: 'Your first name',
	        value: this.userProfile.firstName
	      },
	      {
	        name: 'lastName',
	        placeholder: 'Your last name',
	        value: this.userProfile.lastName
	      },
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	      },
	      {
	        text: 'Save',
	        handler: data => {
	          this.profileProvider.updateName(data.firstName, data.lastName);
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	updateDOB(birthDate){
	  this.profileProvider.updateDOB(birthDate);
	}	

	updateEmail(){
	  let alert = this.alertCtrl.create({
	    inputs: [
	      {
	        name: 'newEmail',
	        placeholder: 'Your new email',
	      },
	      {
	        name: 'password',
	        placeholder: 'Your password',
	        type: 'password'
	      },
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	      },
	      {
	        text: 'Save',
	        handler: data => {
	          this.profileProvider.updateEmail(data.newEmail, data.password);
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	updatePassword(){
	  let alert = this.alertCtrl.create({
	    inputs: [
	      {
	        name: 'newPassword',
	        placeholder: 'Your new password',
	        type: 'password'
	      },
	      {
	        name: 'oldPassword',
	        placeholder: 'Your old password',
	        type: 'password'
	      },
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	      },
	      {
	        text: 'Save',
	        handler: data => {
	          this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	popView(){
     this.navCtrl.pop();
   }

}


