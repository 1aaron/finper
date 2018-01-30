//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

  db: SQLiteObject = null;
  constructor() {
    console.log('Hello DatabaseServiceProvider Provider');
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }
  createTable(){
    let sql = "CREATE TABLE IF NOT EXISTS compras(id INTEGER PRIMARY KEY AUTOINCREMENT, monto INTEGER, fecha TEXT, tipo INTEGER, descuento TEXT)";
    return this.db.executeSql(sql,[]);
  }
  getAllPurchases(){
    let sql = "SELECT * FROM compras";
    return this.db.executeSql(sql,[])
    .then(response => {
      let tasks = [];
      for(let index = 0; index < response.rows.length;index ++){
        tasks.push(response.rows.item(index));
      }
      return Promise.resolve(tasks);
    })
    .catch(error => Promise.reject(error));
  }
  insertCompra(compra: any){
    let sql = "INSERT INTO compras(monto, fecha, tipo, descuento) VALUES(?,?,?,?)";
    this.db.executeSql(sql,[compra.monto, compra.fecha, compra.tipo, compra.descuento]);
  }
}
