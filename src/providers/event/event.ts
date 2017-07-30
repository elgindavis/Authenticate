import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventProvider {
  public userProfileRef:firebase.database.Reference;
  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.userProfileRef = firebase.database()
          .ref(`userProfile/${user.uid}`);
      }
    });
  }

	createEvent(eventName: string, eventDate: string, eventPrice: number, 
	  eventCost: number): firebase.Promise<any> {
	  return this.userProfileRef.child('/eventList').push({
	    name: eventName,
	    date: eventDate,
	    price: eventPrice * 1,
	    cost: eventCost * 1
	  });
		}

	getEventList(): firebase.database.Reference {
		return this.userProfileRef.child('/eventList');
	}

	getEventDetail(eventId:string): firebase.database.Reference {
	  return this.userProfileRef.child('/eventList').child(eventId);
	}



}
