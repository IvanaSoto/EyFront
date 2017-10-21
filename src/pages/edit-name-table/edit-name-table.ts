import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Table } from '../../models/table';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorHandlerProvider } from '../../providers/http-error-handler/http-error-handler';
/**
 * Generated class for the EditNameTablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-name-table',
  templateUrl: 'edit-name-table.html',
})
export class EditNameTablePage {

	id: number;
	name: string;
	error: string;
	table: FormGroup;

	constructor(public navCtrl: NavController,
				public navParams: NavParams,
				private apiProvider: ApiProvider,
				private authProvider : AuthProvider,
				private storage: Storage,
              	public formBuilder: FormBuilder,
				private httpErrorHandler: HttpErrorHandlerProvider) {

		this.storage.get('editTable').then((val) => {
			this.id = val;
			
		});
		this.table = formBuilder.group({
	    	name: [
	        	'',
	        	Validators.compose([
	          		Validators.required,
	          		Validators.maxLength(255),
	        	])
	      	]
	    });

	}

	save(){
	    console.log(this.table.valid);
	    if (this.table.valid) {
	    	this.error = ""
	  		let _this_ = this;
	  		return this.apiProvider.call("post", "update_table_name", {table_id: this.id, name: this.name}, true).then( response => {
	        	if (response.success) {
	        		this.storage.set('tableId', this.id);
		            this.navCtrl.setRoot("TableDetailsPage");
	          	} else {
	            	this.error = response.errors.name;
	        	}
	        }).catch(function(errors: any){
				console.log("mi error");
		        console.log(errors);
		        _this_.httpErrorHandler.displayError(errors);
		    });

	    } else {
	      	console.log('error');
	      	this.error = "El campo no puede estar vacio"
	      	console.log(this.error);
	    }
	}


	ionViewDidLoad() {
		console.log('ionViewDidLoad EditNameTablePage');
	}

}
