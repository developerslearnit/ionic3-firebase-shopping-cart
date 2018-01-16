import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase';

@Injectable()
export class CategoryProvider {

  categoriesRef = firebase.database().ref("categories");
  
  categories: Array<any> = [];
  
  constructor(public events: Events) {

  }

  getCategories(){
    this.categoriesRef.once('value', (snap) => {
      this.categories = [];
      if (snap.val()) {
        var tempCategories = snap.val();
        for (var key in tempCategories) {
          let singleCategory = {
            id: key,
            name: tempCategories[key].name,
            thumb:tempCategories[key].thumb
          };

          this.categories.push(singleCategory);
        }
      }
      this.events.publish('categoryLoaded');
    });
  }

}
