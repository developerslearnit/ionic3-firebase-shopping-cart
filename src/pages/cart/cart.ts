import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItems:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private cartService: CartProvider,) {
  }

  ionViewDidLoad() {
    this.cartService.getCartItems().then((val) => {
      this.cartItems = val;
      console.log(val);
      
    })
  }

}
