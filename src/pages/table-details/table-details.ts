import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Table } from '../../models/table';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpErrorHandlerProvider } from '../../providers/http-error-handler/http-error-handler';

/**
 * Generated class for the TableDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-table-details',
	templateUrl: 'table-details.html',
})
export class TableDetailsPage {

	id: number;
	detail: any;
	totalPriceOrder: any[] = [];
	totalPointsOrder: any[] = [];
	totalPriceTable: number = 0;
	totalPointsTable: number = 0;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
                private apiProvider: ApiProvider,
  				private authProvider : AuthProvider,
				private storage: Storage,
				public toastCtrl: ToastController,
			    private httpErrorHandler: HttpErrorHandlerProvider) {

		this.storage.get('tableId').then((val) => {
			this.id = val; 
	  		console.log(this.id);
	  		this.getTable();
	  	});
	}

	getTable(){
		let _this_ = this;
		return this.apiProvider.call("get", "table/" + this.id, this.id, true).then( response => {
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
		detail.orders.map( orders => {
			let points = 0;
			let price = 0;
			orders.order_items.map( items => {
				points = points + parseInt(items.charged_points);
				price = price + parseInt(items.charged_price);

				this.totalPriceTable = this.totalPriceTable + parseInt(items.charged_price);
				this.totalPointsTable = this.totalPointsTable + parseInt(items.charged_points);
				console.log(items.charged_points);
			});
			this.totalPointsOrder.push(points);
			this.totalPriceOrder.push(price);
			console.log(this.totalPointsOrder);
		});
	}

	close(id){
		console.log(id);
		let _this_ = this;
		return this.apiProvider.call("post", "close_table", {table_id: id}, true).then( response => {
            console.log(response);
            this.navCtrl.setRoot("ActiveTablesPage");
        }).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });
	}

	responsable(id){
		let _this_ = this;
		return this.apiProvider.call("post", "table/reset_leader", {table_id: id}, true).then( response => {
            if (response.success) {
            	this.presentToast('Responsable de mesa actualizado correctamente');
            	this.navCtrl.setRoot("ActiveTablesPage");
            }
        }).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });
	}

	goToEditName(id){
		this.storage.set('editTable', id);
		this.navCtrl.push("EditNameTablePage");
	}

	private presentToast(text) {
  		let toast = this.toastCtrl.create({
	        message: text,
	        duration: 3000,
	        position: 'top'
      	});
      	toast.present();
    }

	ionViewDidLoad() {
		console.log('ionViewDidLoad TableDetailsPage');
  	}

}
