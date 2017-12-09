import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Waiter } from '../../models/waiter';
import { Table } from '../../models/table';
import { AuthProvider } from '../../providers/auth/auth';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

	orders: any[];
    next: string;
    prev: string;

 	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				private authProvider : AuthProvider,
				private events: Events,
                private apiProvider: ApiProvider,
                private storage: Storage,
			    private httpErrorHandler: HttpErrorHandlerProvider) {

  		this.read();
        this.refresh();
  	}
  	read(){
        let _this_ = this;
        return this.apiProvider.call("get", "active_orders", true).then( response => {
            this.next = response.next_page_url;
            if (response.next_page_url != null) {
                this.next = response.next_page_url;
            }
            if (response.prev_page_url != null) {
                this.prev = response.prev_page_url;
            }
          
            this.orders = response.data.filter(element => {
                return element;
            });
            console.log(this.orders);
            return this.orders;
        }).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });
    }

    refresh(){
        setInterval(() => {
            this.read();
        }, 5000);
    }

    goToDetail(id){
        this.orders.map( o => {
            if (o.id == id) {
                this.storage.set('orderId', o.id);
                this.navCtrl.push("OrderDetailPage");
            }
        });
    }

    page(page){
        let _this_ = this;
        let number =  page.split("=");
        console.log(number[1]);
        this.next = undefined;
        this.prev = undefined;

        return this.apiProvider.call("get", "active_orders?page=" + number[1], true).then( response => {
            console.log(response);
            this.next = response.next_page_url;
            if (response.next_page_url != null) {
                this.next = response.next_page_url;
            }
            if (response.prev_page_url != null) {
                this.prev = response.prev_page_url;
            }
          
            this.orders = response.data.filter(element => {
                return element;
            });
            return this.orders;
        }).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });

    }

 	ionViewDidLoad() {
  	}

}
