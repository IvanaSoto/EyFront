import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the HttpErrorHandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HttpErrorHandlerProvider {

	constructor(public http: Http, public alertCtrl: AlertController) {
	}

	displayError(error: any): any {
		var error_text = "Se ha producido un error, por favor, intente nuevamente";
		if( error == "invalid_credentials" )
		{
			error_text = "Usuario o contraseña incorrectos, por favor, intente nuevamente";
		}
		let alert = this.alertCtrl.create({
			title: 'Error',
			subTitle: error_text,
			buttons: ['OK']
	    });
	    alert.present();
	}

}
