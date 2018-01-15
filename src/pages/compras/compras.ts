import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MapaPage } from '../mapa/mapa';
/**
 * Generated class for the ComprasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprasPage');
  }
  inflarModal(opcion: Number){
    this.navCtrl.push(MapaPage,{ opcion: opcion });
  //   let profileModal = this.modalCtrl.create(MapaPage, { opcion: opcion });
  //  profileModal.present();
  }

}

