import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { UserServiceProvider } from '../providers/user-service/user-service';

export const config = {
  apiKey: "AIzaSyATyr4Y7bYZq-dF-ta8QZv9dTq78ImtPGM",
    authDomain: "bibleapp-7bd84.firebaseapp.com",
    databaseURL: "https://bibleapp-7bd84.firebaseio.com",
    projectId: "bibleapp-7bd84",
    storageBucket: "bibleapp-7bd84.appspot.com",
    messagingSenderId: "64484763462"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DataServiceProvider,
    UserServiceProvider
  ]
})
export class AppModule {}
