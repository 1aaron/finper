import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ComprasPage } from '../pages/compras/compras';
import { AhorrosPage } from '../pages/ahorros/ahorros';
import { MapaPage } from '../pages/mapa/mapa';
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MapaPage,
    AhorrosPage,
    ComprasPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      //quitar el scroll para el teclado
      platforms : {
        ios: {
          scrollAssist: false,
          autoFocusAssist: false 
        },
        android: {
          scrollAssist: false,
          autoFocusAssist: false 
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MapaPage,
    AhorrosPage,
    ComprasPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
