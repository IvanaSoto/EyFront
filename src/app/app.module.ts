import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../providers/auth/auth';
import { ApiProvider } from '../providers/api/api';
import { TokenProvider } from '../providers/token/token';
import { HttpErrorHandlerProvider } from '../providers/http-error-handler/http-error-handler';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

let storage = new Storage({});

export function getAuthHttp(http: any) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: "Bearer",
    noJwtError: false,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, Storage]
    },
    AuthProvider,
    ApiProvider,
    TokenProvider,
    HttpErrorHandlerProvider,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppModule {}
