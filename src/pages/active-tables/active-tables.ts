import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Waiter } from '../../models/waiter';
import { AuthProvider } from '../../providers/auth/auth';
import { Events } from 'ionic-angular';
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

	table: Table;

 	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				private authProvider : AuthProvider,
				private events: Events,
  				private httpErrorHandler: HttpErrorHandlerProvider) {

	  	return this.apiProvider.call("get", "active_tables", true).then(
            response => {
              this.table = response.data.teams.filter(element => {
                return element;
              });
              console.log(this.table);
              return this.table;
            }
        ).catch(function(error: any){
            console.log("mi error");
            console.log(error);
            _this_.httpErrorHandler.displayError(error);
        });
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveTablesPage');
  }

}
