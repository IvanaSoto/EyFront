import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { ApiProvider } from '../api/api';
import { TokenProvider } from '../token/token';

import { Waiter } from '../../models/waiter';

@Injectable()
export class AuthProvider {

	constructor(public http: Http,
				private apiProvider: ApiProvider,
				private storage: Storage,
				private tokenProvider: TokenProvider ) {
	}

	login( credentials ): any
	{
		return this.apiProvider.call("post", "login", credentials, false).then(
			response => {
				if( response.success )
				{	
	    			return this.storage.set('token', response.data.token).then( (res) => {
	    				let waiter = new Waiter(
	    					response.data.user.name,
	    					response.data.user.lastname,
	    					response.data.user.email,
	    					"",
	    					""
	    				);
	    				this.storage.set('logedWaiter', waiter);
						return {
							"success": true,
							"waiter": waiter
						};
	    			}).catch(this.handleError);
				}
				else
				{
					throw new Error( response.errors[0] );
				}
			}
		).catch(this.handleError);
	}

	logout(): any
	{
		return this.tokenProvider.removeToken().then(
			response => {
				return response;
			}
		).catch(this.handleError);
	}

	userLoguedIn(): any
	{
		return this.tokenProvider.isTokenValid().then(response => { return response; }).catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}

}
