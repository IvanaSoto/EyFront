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

	id: int;
	table: Table;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private apiProvider: ApiProvider,
				private authProvider : AuthProvider,
				private storage: Storage,
				private httpErrorHandler: HttpErrorHandlerProvider) {

		this.storage.get('orderId').then((val) => {
			this.id = val; 
			console.log(this.id);
		});

		this.getOrder();

	}

	getOrder(){
		let _this_ = this;
		this.id = parseInt(this.id);
		return this.apiProvider.call("get", "orders/" + this.id, this.id, true).then( response => {
            console.log(response);
        }).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OrderDetailPage');
	}

}
