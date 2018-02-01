import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';

/**
 * Generated class for the TabGastosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-gastos',
  templateUrl: 'tab-gastos.html',
})
export class TabGastosPage {
  total = 0;
  totalS = "0";
  gastos = [];
  constructor(private databaseProvider: DatabaseServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log('tab-gastos constructor');
  }

  inicializarDatos(){
    this.total = 0;
    this.totalS = "0";
    this.gastos = [];
  }
  ionViewDidEnter(){
    console.log("gastos enter");
    this.inicializarDatos();
    let misCompras = this.databaseProvider.getAllPurchases();
    misCompras.then((miCompra: any[]) => {
      for(let index = 0; index < miCompra.length;index++){
        let gastoActual = miCompra[index].monto;
        this.total += gastoActual;
        this.gastos.push(miCompra[index])
        //console.log(miCompra[index].id +" "+ miCompra[index].monto+" "+ miCompra[index].fecha+" " + miCompra[index].tipo +" "+ miCompra[index].descuento)
      }
      this.totalS = this.total.toFixed(2);
    });
  }

  ionViewDidLoad() {
    console.log('tab-gastos loaded');
    
  }

}
