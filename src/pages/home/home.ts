import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  promoSliders: any[];
  products: any[];
  productRows:any;
  promoImagesLoaded:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductsProvider,
    private loadingCtrl: LoadingController,
    private events: Events) {
  }

  ionViewWillEnter() {
    this.loadPromo();
    this.loadProducts();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('promoLoaded');
  }

  ionViewDidLoad() {

  }

  loadPromo() {
    let loader = this.loadingCtrl.create({
      content: 'Loading Promos..'
    });
    loader.present();
    this.productService.getPromoSlider();

    this.events.subscribe('promoLoaded', () => {
      this.promoSliders = this.productService.promos;
      if(this.promoSliders.length>0){
        this.promoImagesLoaded =true;
      }
      loader.dismiss();
    })
  }

  loadProducts() {
    this.productService.getProducts();
    this.events.subscribe('productsLoaded', () => {
      this.products = this.productService.products;
      this.productRows = Array.from(Array(Math.ceil(this.products.length/2)).keys())
      
    })
  }

  showDetails(product){
    this.navCtrl.push("SinglePage",{product:product});
    
  }

}
