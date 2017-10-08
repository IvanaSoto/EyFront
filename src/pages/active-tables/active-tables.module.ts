import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveTablesPage } from './active-tables';

@NgModule({
  declarations: [
    ActiveTablesPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveTablesPage),
  ],
})
export class ActiveTablesPageModule {}
