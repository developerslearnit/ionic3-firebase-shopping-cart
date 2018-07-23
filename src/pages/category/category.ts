import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  products: any[];
  productRows:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService:ProductsProvider,private events: Events) {
    
  }

  ionViewDidLoad() {
    this.loadProducts(this.navParams.get('category').id)
  }



  loadProducts(catId) {
    this.productService.getProductByCategory(catId);
    this.events.subscribe('productsLoaded', () => {
      this.products = this.productService.products;
      this.productRows = Array.from(Array(Math.ceil(this.products.length/2)).keys());
    })
  }


  
  showDetails(product){
        this.navCtrl.push("SinglePage",{product:product});    
  }

}
