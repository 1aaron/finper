import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';

/**
 * Generated class for the TabTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-todo',
  templateUrl: 'tab-todo.html',
})
export class TabTodoPage {

  compras: any[] = [];
  gastado = 0;
  ahorrado = 0;
  total = 0;
  gastadoS = "0";
  ahorradoS = "0";
  totalS = "0";

  constructor(private databaseProvider: DatabaseServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabTodoPage');
    let misCompras = this.databaseProvider.getAllPurchases();
    misCompras.then((miCompra: any[]) => {
      for(let index = 0; index < miCompra.length;index++){
        let gastoActual = miCompra[index].monto;
        this.gastado += gastoActual;
        let descActual = miCompra[index].descuento;
        if(descActual > 0){
          descActual /= 100;
          let porcientoCobrado = 1 - descActual;
          this.ahorrado += ((gastoActual / porcientoCobrado) - gastoActual);
        }
        //console.log(miCompra[index].id +" "+ miCompra[index].monto+" "+ miCompra[index].fecha+" " + miCompra[index].tipo +" "+ miCompra[index].descuento)
      }
      this.total = this.gastado - this.ahorrado;
      this.totalS = this.total.toFixed(2);
      this.ahorradoS =this.ahorrado.toFixed(2);
      this.gastadoS = this.gastado.toFixed(2);
    });
  }

}