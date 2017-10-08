import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpErrorHandlerProvider } from '../../providers/http-error-handler/http-error-handler';

/**
 * Generated class for the CodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-code',
  templateUrl: 'code.html',
})
export class CodePage {
	
	name: string;

	constructor(public navCtrl: NavController,
				      public navParams: NavParams,
        		  private authProvider : AuthProvider,
              private apiProvider: ApiProvider,
              private httpErrorHandler: HttpErrorHandlerProvider,) {
		
    this.authProvider = authProvider;
	
  }

	generate(){
		let _this_ = this;
		return this.apiProvider.call("post", "create_table", {name: this.name}, true).then(
      response => {
        console.log(response);
        return data.code;
      }
    ).catch(function(error: any){
      console.log("mi error");
      console.log(error);
      _this_.httpErrorHandler.displayError(error);
    });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodePage');
  }

}
