import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import firebase from "firebase";

@Injectable()
export class AuthProvider {
  firedata = firebase.database().ref('/customers');
  constructor(public events: Events) {}

  login(loginParams){
    var promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(loginParams.email, loginParams.password).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
       })
    })

    return promise;
  }

  registerUser(userObj: any) {
    var promise = new Promise((resolve, reject) => {
      firebase .auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then(() => {
          this.firedata.child(firebase.auth().currentUser.uid).set({
            name:userObj.name,
            address:userObj.address,
            email:userObj.email
          }).then(()=>{
            resolve({ success: true });
          }).catch((err)=>{
            reject(err);
          })
         // resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    })
    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }
}
