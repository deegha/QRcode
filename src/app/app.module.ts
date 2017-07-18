import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QrCodeServiceProvider } from '../providers/qr-code-service/qr-code-service';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { AngularFireDatabase} from "angularfire2/database";

import { AngularFireModule } from 'angularfire2';                                 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule                                                                                                                          
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QrCodeServiceProvider,
  ]
})
export class AppModule {}
