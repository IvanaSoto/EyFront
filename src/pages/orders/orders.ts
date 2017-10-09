import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Waiter } from '../../models/waiter';
import { AuthProvider } from '../../providers/auth/auth';
import { Events } from 'ionic-angular';
import { HttpErrorHandlerProvider } from '../../providers/http-error-handler/http-error-handler';
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

 	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				private authProvider : AuthProvider,
				private events: Events,
  				private httpErrorHandler: HttpErrorHandlerProvider) {

 		

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OrdersPage');
	}

}
