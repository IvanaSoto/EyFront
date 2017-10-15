import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController, MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "CodePage";

  pages: Array<{title: string, action: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              public authProvider : AuthProvider,
              public events: Events,
              public menuCtrl: MenuController ) {
    
    this.initializeApp();

    events.subscribe('user:login', (page) => {
      this.updateMenu(page);
    });

    this.updateMenu('CodePage');


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(item) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if( item.action == "open-page" )
    {
      this.nav.setRoot(item.component);
    }
    else if( item.action == "logout" )
    {
      this.logout();
    }
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Salir?',
      message: 'Estas seguro que quieres salir?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Si, salir',
          handler: () => {
            this.authProvider.logout().then((data) => { this.updateMenu('') });
          }
        }
      ]
    });
    confirm.present();
  }

  updateMenu(page: string) {
    this.authProvider.userLoguedIn().then((loguedIn) => {
      if( loguedIn )
      {
        this.rootPage = page;

        this.menuCtrl.enable(true);

            this.pages = [
              { title: 'Llamadas', action:'open-page', component: 'WaiterCallsPage' },
              { title: 'Ordenes', action:'open-page', component: 'OrdersPage' },
              { title: 'Mesas activas', action:'open-page', component: 'ActiveTablesPage' },
              { title: 'Cargar código', action:'open-page', component: "CodePage" },
              { title: 'Log Out', action:'logout', component: "" }
            ];
        
      }
      else
      {
        this.rootPage = "LogInPage";

        this.menuCtrl.enable(false);

        this.pages = [];

      }
      this.nav.setRoot( this.rootPage );
    });
  }
}
