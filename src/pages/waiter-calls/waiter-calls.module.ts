import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaiterCallsPage } from './waiter-calls';

@NgModule({
  declarations: [
    WaiterCallsPage,
  ],
  imports: [
    IonicPageModule.forChild(WaiterCallsPage),
  ],
})
export class WaiterCallsPageModule {}
