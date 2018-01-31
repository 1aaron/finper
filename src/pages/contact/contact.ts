import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabTodoPage } from '../tab-todo/tab-todo';
import { TabGastosPage } from '../tab-gastos/tab-gastos';
import { TabAhorrosPage } from '../tab-ahorros/tab-ahorros';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  tab1Root = TabTodoPage;
  tab2Root = TabGastosPage;
  tab3Root = TabAhorrosPage;

  constructor(public navCtrl: NavController) {

  }

}
