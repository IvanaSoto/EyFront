import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Waiter } from '../../models/waiter';
import { AuthProvider } from '../../providers/auth/auth';
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
  				private httpErrorHandler: HttpErrorHandlerProvider,) {

		this.authProvider = authProvider;
	}

	login() {
		console.log(this.email);
		console.log(this.password);
		
		let _this_ = this;
		this.authProvider.login( { email : this.email, password: this.password } )
			.then(
				response => {
					if( response.success )
					{
						console.log("logueado");
						console.log(this.waiter)
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
