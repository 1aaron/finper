import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AhorrosPage } from '../ahorros/ahorros';
import { ComprasPage } from '../compras/compras';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = AhorrosPage;
  tab5Root = ComprasPage;

  constructor() {

  }
}
