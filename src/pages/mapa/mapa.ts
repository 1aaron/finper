import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Storage } from '@ionic/storage';

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
  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
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

 constructor(private storage: Storage, params: NavParams,private viewCtrl: ViewController) {
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
  this.storage.get('gastos').then((val) => {
    if(val != null){
      let value = val + "\n" + this.titulo + " $" + this.monto;
      console.log("valor" + value);
      this.storage.set("gastos",value);
    }else{
      let value = this.titulo + " $" + this.monto;
      console.log("valor" + value);
      this.storage.set("gastos",value);
    }
  });
  this.dismiss();
 }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
