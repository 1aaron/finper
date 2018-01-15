import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  pais = "mx";
  estados;
  estado = "";
  usuario = "";
  contra = "";

  mx;
  eu;
  ar;
  ca;
  borrado = 0;
  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.iniciarEstados();
    let dia = new Date().getDay();
    this.storage.get('borrado').then((val) => {
      if(val != null){
        this.borrado = val;
      }
    });
    if(dia > 0 && this.borrado == 0){
      this.storage.set("gasto",0);
      this.storage.set("ahorro",0);
      //TODO: usar bd para controlar las semanas 
      this.storage.set('borrado',1);
    }
  }  
  compareFn(){
    switch (this.pais) {
      case "mx":
        this.estados = this.mx;
        break;
      case "eu":
        this.estados = this.eu;
        break;
      case "ar":
        this.estados = this.eu;
        break;
      case "ca":
        this.estados = this.ca;
        break;    
      default:
        break;
    }
    this.estado = this.estados[0];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    let pais = document.getElementById("paisSelect");
    pais.onchange = function(e){
      console.log(this);
    }
  }

  cambiarTabs(){

    this.navCtrl.setRoot(TabsPage);
  }

  validarDatos(){
    if(this.usuario != "" && this.estado != "" && this.pais != "" && this.contra != ""){
      this.storage.set("usuario",this.usuario);
      this.storage.set("estado",this.estado);
      this.storage.set("pais",this.pais);
      this.storage.set("password",this.contra);
      
      this.cambiarTabs();
    }else{
      alert("Llena los campos");
    }
    
  }

  iniciarEstados(){
    this.mx = ["Aguascalientes", "Baja California", "Baja California Sur",
"Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
"Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán",
"Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
"San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala",
"Veracruz", "Yucatán", "Zacatecas"];
    this.eu = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Carolina del Norte",
"Carolina del Sur", "Colorado", "Connecticut", "Dakota del Norte", "Dakota del Sur",
"Delaware", "Florida", "Georgia", "Hawái", "Idaho", "Illinois", "Indiana", 
"Iowa", "Kansas", "Kentucky", "Luisiana", "Maine", "Maryland", "Massachusetts", 
"Míchigan", "Minnesota", "Misisipi", "Misuri", "Montana", "Nebraska", "Nevada",
"Nueva Jersey", "Nueva York", "Nuevo Hampshire", "Nuevo México", "Ohio", "Oklahoma",
"Oregón", "Pensilvania", "Rhode Island", "Tennessee", "Texas", "Uta", "Vermont",
"Virginia", "Virginia Occidental", "Washington", "Wisconsin", "Wyomin"];
    this.ca = ["Ontario", "Quebec", "Nova Scotia", "New Brunswick", "Manitoba",
"British Columbia", "Prince Edward Island", "Saskatchewan", "Alberta",
"Newfoundland and Labrador", "the Northwest Territories", "Yukon", "Nunavut"];
    this.ar = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba",
"Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
"Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
"Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
"Tucumán"];
    this.compareFn();
  }
}
