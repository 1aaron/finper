import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Storage } from '@ionic/storage';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  opcion;
  constructor( private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    let opcion = navParams.get("opcion");
    console.log(opcion);
    this.opcion = opcion;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
    switch (this.opcion) {
      case 0:
        document.getElementById("pizza").style.display = 'block';
        document.getElementById("super").style.display = "none";
        document.getElementById("gas").style.display = "none";        
        break;
      case 1:
        document.getElementById("pizza").style.display = 'none';
        document.getElementById("super").style.display = "block";
        document.getElementById("gas").style.display = "none"; 
        break;
      case 2:
        document.getElementById("pizza").style.display = 'none';
        document.getElementById("super").style.display = "none";
        document.getElementById("gas").style.display = "block"; 
        break;
      default:
        break;
    }
  }
  agregarCompra(){
    let modal= this.modalCtrl.create(modalGastos,{tipo:this.opcion});
    modal.present();
  }
}

@Component({
  selector: "modal-gastos",
  templateUrl: "modalGastos.html"
})
export class modalGastos {
  tipoCompra;
  titulo;
  monto;
  descuento = '0';
  compras: any[] = [];

 constructor(private databaseProvider: DatabaseServiceProvider, private storage: Storage, params: NavParams,private viewCtrl: ViewController) {
   this.tipoCompra =  params.get('tipo');
   switch (this.tipoCompra) {
     case 0:
      this.titulo = "Pizza";
      break;
     case 1:
     this.titulo = "Super"
      break;
     case 2:
     this.titulo = "Gasolinera"
      break;
     default:
      break;
   }
 }

 guardar(){
  this.compras['monto'] = this.monto;
  this.compras['tipo'] = this.tipoCompra;
  //save date of today
  let date = new Date();
  this.compras['fecha'] = date.getDate() + "/" +(date.getMonth() + 1) + "/"+date.getFullYear();   
  this.compras['descuento'] = this.descuento;  
  //insert purchases on database 
  this.databaseProvider.insertCompra(this.compras);

  // let misCompras = this.databaseProvider.getAllPurchases();
  // misCompras.then((miCompra: any[]) => {
  //   for(let index = 0; index < miCompra.length;index++){
  //     console.log(miCompra[index].id +" "+ miCompra[index].monto+" "+ miCompra[index].fecha+" " + miCompra[index].tipo +" "+ miCompra[index].descuento)
  //   }
  // })
  this.viewCtrl.dismiss();
 }

  // dismiss() {
  //   this.viewCtrl.dismiss();
  // }
}
