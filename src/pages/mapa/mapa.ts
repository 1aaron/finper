import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Storage } from '@ionic/storage';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var google;
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
  /*
  * elemento mapa de la vista html
  */
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  opcion;
  type;
  constructor(private http: Http, private geolocation: Geolocation, private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    let opcion = navParams.get("opcion");
    console.log(opcion);
    this.opcion = opcion;
    switch (this.opcion) {
        case 0:
          this.type = "pizza";     
          break;
        case 1:
          this.type = "super mercado";     
          break;
        case 2:
          this.type = "gasolinera";     
          break;
        default:
          break;
      }
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      this.getThings(this.type,latLng).then((results : Array<any>)=>{
        console.log(results);
        for(let i = 0 ;i < results.length ; i++){
          this.createMarker(results[i]);
        }
      },(status)=>console.log(status));

    })).catch((error) => {
      let latLng = new google.maps.LatLng(19.244893, -103.724294);
      alert("No se pudo obtener tu ubicación");
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.getThings(this.type,latLng).then((results : Array<any>)=>{
        for(let i = 0 ;i < results.length ; i++){
          this.createMarker(results[i]);
          console.log(results[i]);
        }
    },(status)=>console.log(status));
    });
  }
  createMarker(place){
      var gpmarker = new google.maps.MarkerImage(
        place.icon, null, null, null, new google.maps.Size(25, 25)
      );
      let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      icon: gpmarker
      });
  }   

  getThings(type: String, ubicacion: any){
    console.log(this.type);  
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
        location : ubicacion,
        radius : 1000,
        keyword: this.type
    };
    return new Promise((resolve,reject)=>{
        service.nearbySearch(request,function(results,status){
            if(status === google.maps.places.PlacesServiceStatus.OK)
            {
              resolve(results);    
            }else
            {
              reject(status);
            }
        }); 
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
    this.loadMap();
    // switch (this.opcion) {
    //   case 0:
    //     document.getElementById("pizza").style.display = 'block';
    //     document.getElementById("super").style.display = "none";
    //     document.getElementById("gas").style.display = "none";        
    //     break;
    //   case 1:
    //     document.getElementById("pizza").style.display = 'none';
    //     document.getElementById("super").style.display = "block";
    //     document.getElementById("gas").style.display = "none"; 
    //     break;
    //   case 2:
    //     document.getElementById("pizza").style.display = 'none';
    //     document.getElementById("super").style.display = "none";
    //     document.getElementById("gas").style.display = "block"; 
    //     break;
    //   default:
    //     break;
    // }
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
  this.compras['tipo'] = this.titulo;
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
