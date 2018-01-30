import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@ionic-native/sqlite';

import { DatabaseServiceProvider } from '../providers/database-service/database-service';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //TabsPage
  rootPage:any = LoginPage;

  constructor(private databaseService: DatabaseServiceProvider, private sqlite: SQLite, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.createDatabase();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'finper.db',
      location: 'default' // the location field is required
    })
    .then((db: SQLiteObject) => {
      this.databaseService.setDatabase(db);
      return this.databaseService.createTable();
    })
    .catch(error =>{
      console.error(error);
    });
  }
  
}
