import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditNameTablePage } from './edit-name-table';

@NgModule({
  declarations: [
    EditNameTablePage,
  ],
  imports: [
    IonicPageModule.forChild(EditNameTablePage),
  ],
})
export class EditNameTablePageModule {}
