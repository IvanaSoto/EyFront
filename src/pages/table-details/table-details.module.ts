import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TableDetailsPage } from './table-details';

@NgModule({
  declarations: [
    TableDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TableDetailsPage),
  ],
})
export class TableDetailsPageModule {}
