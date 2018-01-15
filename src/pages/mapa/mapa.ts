import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
