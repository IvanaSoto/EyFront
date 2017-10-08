import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';

/*
  Generated class for the TokenProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TokenProvider {
	
	jwtHelper: JwtHelper = new JwtHelper();

	constructor(public http: Http,
				private storage: Storage ) {
	}

	isTokenValid(tokenName = "token"): any
	{
		return this.getToken(tokenName).then((token) => {
			if( token == null )
			{
				return false;
			}
			var now = new Date();
			var expirationDate = this.jwtHelper.getTokenExpirationDate(token);
			return now.getTime() < expirationDate.getTime();
		});
	}

	getToken(tokenName = "token"): any
	{
		return this.storage.get(tokenName).then((token) => { return token; });
	}

	removeToken(tokenName = "token"): any
	{
		return this.storage.remove(tokenName).then((data) => { return data; });
	}



}
