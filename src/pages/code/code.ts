import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  table: FormGroup;
  error: string;

	constructor(public navCtrl: NavController,
				      public navParams: NavParams,
        		  private authProvider : AuthProvider,
              private apiProvider: ApiProvider,
              public formBuilder: FormBuilder,
              private httpErrorHandler: HttpErrorHandlerProvider) {
		
    this.authProvider = authProvider;

    this.table = formBuilder.group({
        name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(255),
          ])
        ],
      });
	
  }

	generate(){
    console.log(this.table.valid);
    if (this.table.valid) {
      this.error = ""

  		let _this_ = this;
  		return this.apiProvider.call("post", "create_table", {name: this.name}, true).then(
        response => {
          console.log(response);
        }
      ).catch(function(error: any){
        console.log("mi error");
        console.log(error);
        _this_.httpErrorHandler.displayError(error);
      });

    } else {
      console.log('error');
      this.error = "El campo no puede estar vacio"
      console.log(this.error);
    }
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodePage');
  }

}
