import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaisesModel } from '../../app/models/paises-model';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  estados;
  estado;
  nombre;
  idioma;
  image : string = "assets/imgs/placeholder.jpg";
  
  constructor(private camera: Camera, private plt: Platform, private toast: Toast, private storage: Storage, public navCtrl: NavController) {
    let paisesModel = new PaisesModel();
    this.storage.get('idioma').then((val) => {
      if(val != null){
        this.idioma = val;
      }else{
        this.idioma = "es";
      }
    })
    .catch((res) => {
      console.log(res);
    });

    this.storage.get('imagen').then((val) => {
      val != null ? this.image = val : this.image = "assets/imgs/placeholder.jpg";
      console.log(val);
    }).catch((res) => {
      console.log(res);
    });
    this.storage.get('usuario').then((val) => {
      console.log(val);
      this.nombre = val;
    });

    this.storage.get("pais").then((val) => {
      console.log(val);
      this.estados = paisesModel.getEstados(val);      
    });

    this.storage.get('estado').then((val) => {
      this.estado = val;
    });
  }

  btnGuardar(){
    this.storage.set("idioma", this.idioma);
    this.storage.set("estado", this.estado);
    this.storage.set("usuario", this.nombre); 
    this.storage.set('imagen',this.image);
    if(this.plt.is('cordova')){ 
      this.toast.show("guardado","300","center").subscribe(
        toast => {
          console.log(toast);
        }
      );  
    }else{
      alert("guardado");
    }
  }
  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      let imagenUsuario: HTMLElement = document.getElementById("imgUsuario");
      imagenUsuario.setAttribute("src",this.image);
    })
    .catch(error =>{
      console.error( error );
    });
  }
}
