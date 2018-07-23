
import { config } from './../config/app.config';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import * as firebase from 'firebase';
import { ProductsProvider } from '../providers/products/products';
import { CategoryProvider } from '../providers/category/category';
import { CartProvider } from '../providers/cart/cart';
import { AuthProvider } from '../providers/auth/auth';
import { OrderProvider } from '../providers/order/order';


firebase.initializeApp(config.firebasConfig);

@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsProvider,
    CategoryProvider,
    NativePageTransitions,
    CartProvider,
    AuthProvider,
    OrderProvider    
  ]
})
export class AppModule {}
