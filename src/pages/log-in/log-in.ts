import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Waiter } from '../../models/waiter';
import { AuthProvider } from '../../providers/auth/auth';
import { Events } from 'ionic-angular';
import { HttpErrorHandlerProvider } from '../../providers/http-error-handler/http-error-handler';

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
	email: string;
	password: string;

	error: string;
	waiter: Waiter;

	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				private authProvider : AuthProvider,
				private events: Events,
  				private httpErrorHandler: HttpErrorHandlerProvider) {

		this.authProvider = authProvider;
	}

	login() {
		
		let _this_ = this;
		this.authProvider.login( { email : this.email, password: this.password } )
			.then(
				response => {
					if( response.success )
					{
						_this_.events.publish('user:login', 'CodePage');
					}
					else
					{
						console.log("mostrar error");
						console.log(response.errors)
					}
				}
			).catch(function(error: any){
				console.log("mi error");
				console.log(error);
				_this_.httpErrorHandler.displayError(error);
			});
	}

	goToOrders() {
		this.navCtrl.push("OrdersPage");
	}

	goToCode() {
		this.navCtrl.push("CodePage");
	}
	
	ionViewDidLoad() {
	}

}
