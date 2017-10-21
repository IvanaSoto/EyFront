import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Table } from '../../models/table';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpErrorHandlerProvider } from '../../providers/http-error-handler/http-error-handler';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

	id: number;
	detail: any;
	totalPrice: number = 0;
	totalPoints: number = 0;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private apiProvider: ApiProvider,
				private authProvider : AuthProvider,
				private storage: Storage,
				private httpErrorHandler: HttpErrorHandlerProvider) {

		this.storage.get('orderId').then((val) => {
			this.id = val;
			this.getOrder();
		});

	}

	getOrder(){
		let _this_ = this;
		return this.apiProvider.call("get", "orders/" + this.id, this.id, true).then( response => {
			console.log(response);
			this.detail = response;
			this.sumarTotal(this.detail);
			return this.detail;
		}).catch(function(error: any){
			console.log("mi error");
			console.log(error);
			_this_.httpErrorHandler.displayError(error);
		});
	}

	sumarTotal(detail){
		detail.order_items.map( prod => {

			this.totalPrice = this.totalPrice + parseInt(prod.charged_price);
			this.totalPoints = this.totalPoints + parseInt(prod.charged_points);
		});
		console.log(this.totalPrice);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OrderDetailPage');
	}

}
