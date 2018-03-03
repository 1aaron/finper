import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';

/**
 * Generated class for the AhorrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ahorros',
  templateUrl: 'ahorros.html',
})
export class AhorrosPage {

  finSemana = false;
  ahorros = [];
  constructor(private databaseProvider: DatabaseServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  view = [window.screen.width,window.screen.height / 3];
  data: any[] = [];

  inicializarVariables(){
    this.ahorros = [];
    this.data = [];
  }
  ionViewDidEnter(){
    this.inicializarVariables();
    let misCompras = this.databaseProvider.getAllPurchases();
    misCompras.then((miCompra: any[]) => {
      let totalSemanal = 0;
      let semanaCant = 1;
      for(let index = 0; index < miCompra.length;index++){
        let fecha = new Date(miCompra[index].fecha);
        if(fecha.getDay() != 6 && this.finSemana){
          let miSemana = new SemanaObject();
          miSemana.total = totalSemanal.toFixed(2);
          miSemana.semana = semanaCant;
          this.ahorros.push(miSemana);
          this.finSemana = false;
          totalSemanal = 0;
          semanaCant++;
        } else if(fecha.getDay() == 6 && !this.finSemana) {
          this.finSemana = true;
        }
        let gastoActual = miCompra[index].monto;
        let descActual = miCompra[index].descuento;
        if(descActual > 0){
          descActual /= 100;
          let porcientoCobrado = 1 - descActual;
          let ahorro = ((gastoActual / porcientoCobrado) - gastoActual);
          totalSemanal += ahorro;
          //miCompra[index].ahorro = ahorro;
          //this.ahorros.push(miCompra[index]);
        }
        //console.log(miCompra[index].id +" "+ miCompra[index].monto+" "+ miCompra[index].fecha+" " + miCompra[index].tipo +" "+ miCompra[index].descuento)
      }
      if(totalSemanal != 0){
        let miSemana = new SemanaObject();
          miSemana.total = totalSemanal.toFixed(2);
          miSemana.semana = semanaCant;
        this.ahorros.push(miSemana);
        this.finSemana = false;
        totalSemanal = 0;
      }
      this.llenarGrafica();
    });
  }


  llenarGrafica(){
    let mData = [];
    for (let index = 0; index < this.ahorros.length; index++) {
      const element = this.ahorros[index];
      mData.push({'name': 'Semana '+element.semana ,'value' : Number(element.total)});
    }  
    this.data = mData;
  }
  ionViewDidLoad() {
    console.log("width: "+window.screen.width)
    console.log("height: "+ (window.screen.height / 2))
  }

}
class SemanaObject {
  total: String;
  semana: Number;
}