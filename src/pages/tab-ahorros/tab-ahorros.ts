import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';

/**
 * Generated class for the TabAhorrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-ahorros',
  templateUrl: 'tab-ahorros.html',
})
export class TabAhorrosPage {

  total = 0;
  totalS = "0";
  ahorros = [];
  constructor(private databaseProvider: DatabaseServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log('tab-ahorros constructor');
  }
  inicializarDatos(){
    this.total = 0;
    this.totalS = "0";
    this.ahorros = [];
  }
  ionViewDidEnter(){
    console.log("ahorro enter");
    this.inicializarDatos();
    let misCompras = this.databaseProvider.getAllPurchases();
    misCompras.then((miCompra: any[]) => {
      for(let index = 0; index < miCompra.length;index++){
        let gastoActual = miCompra[index].monto;
        let descActual = miCompra[index].descuento;
        if(descActual > 0){
          descActual /= 100;
          let porcientoCobrado = 1 - descActual;
          let ahorro = ((gastoActual / porcientoCobrado) - gastoActual);
          this.total += ahorro;
          miCompra[index].ahorro = ahorro;
          this.ahorros.push(miCompra[index]);
        }
        //console.log(miCompra[index].id +" "+ miCompra[index].monto+" "+ miCompra[index].fecha+" " + miCompra[index].tipo +" "+ miCompra[index].descuento)
      }
      this.totalS = this.total.toFixed(2);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabAhorrosPage');
  }

}
