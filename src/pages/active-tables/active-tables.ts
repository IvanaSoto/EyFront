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
 * Generated class for the ActiveTablesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-active-tables',
  templateUrl: 'active-tables.html',
})
export class ActiveTablesPage {

    tables: Table[];
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
  	}

    read(){
        let _this_ = this;
        return this.apiProvider.call("get", "active_tables", true).then( response => {
            console.log(response);
            if (response.next_page_url != null) {
                this.next = response.next_page_url;
            }
            if (response.prev_page_url != null) {
                this.prev = response.prev_page_url;
            }
          
            this.tables = response.data.filter(element => {
                let table = new Table(
                    element.id,
                    true,
                    element.name,
                    element.quantity_customers,
                    element.code,
                    element.created_at
                );
                return table;
            });
            console.log(this.tables);
            return this.tables;
        }).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });
    }

    goToDetail(id){
        this.tables.map( t => {
            if (t.id == id) {
                this.storage.set('tableId', id);
                this.navCtrl.push("TableDetailsPage");
            }
        });
    }

    page(page){
        let _this_ = this;
        let number =  page.split("=");
        console.log(number[1]);
        this.next = undefined;
        this.prev = undefined;

        return this.apiProvider.call("get", "active_tables?page=" + number[1], true).then( response => {
            console.log(response);
            this.next = response.next_page_url;
            if (response.next_page_url != null) {
                this.next = response.next_page_url;
            }
            if (response.prev_page_url != null) {
                this.prev = response.prev_page_url;
            }
          
            this.tables = response.data.filter(element => {
                let table = new Table(
                    element.id,
                    true,
                    element.name,
                    element.quantity_customers,
                    element.code,
                    element.created_at
                );
                return table;
            });
            console.log(this.tables);
            return this.tables;
        }).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });

    }

    ionViewDidLoad() {
        this.read();
    }

}
