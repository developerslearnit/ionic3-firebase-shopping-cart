import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {
  selectProduct: any;
  productCount: number = 1;
  cartItems: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cartService: CartProvider) {
    if (this.navParams.get("product")) {
      window.localStorage.setItem('selectedProduct', JSON.stringify(this.navParams.get("product")));
    }


  }

  ionViewWillEnter() {
    // this.cartService.removeAllCartItems().then(res=>{

    // });
    this.getSingleProduct();
  }

  ionViewDidLeave() {
    window.localStorage.removeItem('selectedProduct');
  }

  getSingleProduct() {
    if (window.localStorage.getItem('selectedProduct') != 'undefined') {
      this.selectProduct = JSON.parse(window.localStorage.getItem('selectedProduct'))
    }
  }

  ionViewDidLoad() {
    this.selectProduct = this.navParams.get("product");
    this.cartService.getCartItems().then((val) => {
      this.cartItems = val;
      console.log("this.cartItems ", this.cartItems);
    })

  }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount--;
    }

  }

  incrementProductCount() {
    this.productCount++;

  }

  addToCart(product) {
    var productPrice = this.productCount * parseInt(product.price);
    let cartProduct = {
      product_id: product.id,
      name: product.name,
      thumb: product.thumb,
      count: this.productCount,
      totalPrice: productPrice
    };
    this.cartService.addToCart(cartProduct).then((val) => {

    });
  }

  
}
