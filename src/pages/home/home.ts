import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Facebook } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userProfile: any = null;

  constructor(public navCtrl: NavController) {

  }

  facebookLogin(){
    Facebook.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

    firebase.auth().signInWithCredential(facebookCredential)
      .then((success) => {
        console.log("Firebase success: " + JSON.stringify(success));
        this.userProfile = success;
    })
    .catch((error) => {
    console.log("Firebase failure: " + JSON.stringify(error));
  });

    }).catch((error) => { console.log(error) });
  }
}
