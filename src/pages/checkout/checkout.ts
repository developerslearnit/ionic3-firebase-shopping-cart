import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import firebase from "firebase";
import { CartProvider } from "../../providers/cart/cart";
import { AuthProvider } from "../../providers/auth/auth";
import { OrderProvider } from "../../providers/order/order";

@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  cartItems: any[] = [];
  productAmt: number = 0;
  totalAmount: number = 0;
  shippingFee: number = 20;
  customerName: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController,
    public authService: AuthProvider,
    private orderService: OrderProvider
  ) {
    this.loadCartItems();
  }

  loadCartItems() {
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.cartService
      .getCartItems()
      .then(val => {
        this.cartItems = val;

        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.productAmt += parseInt(v.totalPrice);
          });

          this.totalAmount = this.productAmt + this.shippingFee;
        }
        loader.dismiss();
      })
      .catch(err => {});
  }

  ionViewDidLoad() {
    this.authService
      .getuserdetails()
      .then((response: any) => {
        this.customerName = response.name;
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    if (!user) this.navCtrl.setRoot("LoginPage");
  }

  ionViewCanEnter() {}

  placeOrder() {
    let loader = this.loadingCtrl.create({
      content: "Placing Order.."
    });
    loader.present();
    var user = firebase.auth().currentUser;
    if (user) {
      let orderObj = {
        customerId: user.uid,
        name: this.customerName,
        shipping: this.shippingFee,
        orderAmount: this.productAmt,
        amount: this.totalAmount,
        orders: this.cartItems
      };

      this.orderService.placeOrder(orderObj).then(() => {
        loader.dismiss();
        this.navCtrl.setRoot('HomePage');
      });
    } else {
      loader.dismiss();
    }
  }
}
