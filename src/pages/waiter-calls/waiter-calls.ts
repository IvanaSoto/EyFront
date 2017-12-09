import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Table } from '../../models/table';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpErrorHandlerProvider } from '../../providers/http-error-handler/http-error-handler';

/**
 * Generated class for the WaiterCallsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-waiter-calls',
  templateUrl: 'waiter-calls.html',
})
export class WaiterCallsPage {

	calls: any[];
    next: string;
    prev: string;
    interval: any;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private apiProvider: ApiProvider,
				private authProvider : AuthProvider,
				private storage: Storage,
				private httpErrorHandler: HttpErrorHandlerProvider) {

		this.read();
        this.refresh();
	}

    read(){
        let _this_ = this;
        return this.apiProvider.call("get", "active_waiter_calls", true).then( response => {
            this.next = response.next_page_url;
            if (response.next_page_url != null) {
                this.next = response.next_page_url;
            }
            if (response.prev_page_url != null) {
                this.prev = response.prev_page_url;
            }
          
            this.calls = response.data.filter(element => {
                return element;
            });

            return this.calls;
        }).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });
    }

    refresh(){
        this.interval = setInterval(() => {
            this.read();
        }, 5000);
    }

    ionViewWillLeave() {
        clearInterval(this.interval);
    }

    page(page){
        let _this_ = this;
        let number =  page.split("=");
        console.log(number[1]);
        this.next = undefined;
        this.prev = undefined;

        return this.apiProvider.call("get", "active_waiter_calls?page=" + number[1], true).then( response => {
            console.log(response);
            this.next = response.next_page_url;
            if (response.next_page_url != null) {
                this.next = response.next_page_url;
            }
            if (response.prev_page_url != null) {
                this.prev = response.prev_page_url;
            }
          
            this.calls = response.data.filter(element => {
                return element;
            });
            return this.calls;
        }).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });

    }
    
	ionViewDidLoad() {
	}

}
