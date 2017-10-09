import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { TokenProvider } from '../token/token';

@Injectable()
export class ApiProvider {

	private API_URL = "http://127.0.0.1:8000/api/";
	contentHeader = new Headers({"Content-Type": "application/json"});
	jwtHelper: JwtHelper = new JwtHelper();

	constructor(public http: Http,
				public authHttp: AuthHttp,
				private tokenProvider: TokenProvider) {
	}


	call( method = "post", endpoint = "", data = {}, secure = true ): any
	{
		if( secure )
		{
			return this.tokenProvider.isTokenValid().then(
				result => {
					if( result )
					{
						// token válido
						if( method == "get" )
						{
							return this.get(endpoint, data).then((data) => { return data; });
						}
						else
						{
							return this.post(endpoint, data, method).then((data) => { return data; });
						}
					}
					else
					{
						// token NO válido (expirado)
						return this.handleExpiredToken();
					}
				}
			).catch(this.handleError);
		}
		else
		{
			if( method == "get" )
			{
				return this.regularGet(endpoint, data).then((data) => { return data; });
			}
			else
			{
				return this.regularPost(endpoint, data, method).then((data) => { return data; });
			}
		}
	}


	private regularGet(endpoint, data): any
	{
		return this.http.get(this.API_URL + endpoint, { headers: this.contentHeader })
			.map(res => res.json())
            .toPromise()
            .then((data) => {
				if( data.error )
				{
					return Promise.reject(data.error);
				}
				return data;
			})
            .catch(this.handleError);
	}

	private regularPost(endpoint, data, method = "post"): any
	{
		data["_method"] = method;
		return this.http.post(this.API_URL + endpoint, data, { headers: this.contentHeader })
			.map(res => res.json())
            .toPromise()
            .then((data) => {
				if( data.error )
				{
					return Promise.reject(data.error);
				}
				return data;
			})
            .catch(this.handleError);
	}

	private get(endpoint, data = {}): any
	{
		return this.authHttp.get(this.API_URL + endpoint)
			.map(res => res.json())
            .toPromise()
            .then((data) => {
				if( data.error )
				{
					return Promise.reject(data.error);
				}
				return data;
			}).catch(this.handleError);
	}

	private post(endpoint, data = {}, method = "post"): any
	{
		data["_method"] = method;
		return this.authHttp.post(this.API_URL + endpoint, data)
			.map(res => res.json())
            .toPromise()
            .then((data) => {
				if( data.error )
				{
					return Promise.reject(data.error);
				}
				return data;
			}).catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.log(error.message || error);
		return Promise.reject(error.message || error);
	}

	private handleExpiredToken(): Promise<any> {
		console.log("token_expired");
		return Promise.reject("token_expired");
	}

}
