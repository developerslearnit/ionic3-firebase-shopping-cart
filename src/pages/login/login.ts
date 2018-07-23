import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController, AlertController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";




@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email: any;
  password: any;

  constructor(public navCtrl: NavController, public authService: AuthProvider,
    private loadingCtrl: LoadingController,private alertCtrl: AlertController) {}

  ionViewDidLoad() {}

  login() {

    let loader = this.loadingCtrl.create({
      content: 'Authenticating..'
    });
    loader.present();
    let loginParams = {
      email:this.email,
      password:this.password
    }

    this.authService.login(loginParams).then((res)=>{
      loader.dismiss();
      this.navCtrl.push('CheckoutPage');
    }).catch((err)=>{
      loader.dismiss();
      this.presentAlert(err.message);
    });


  }

  showRegisterPage() {
    this.navCtrl.push("RegisterPage");
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Auth Error',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }


}
