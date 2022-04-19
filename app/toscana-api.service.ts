import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { get,set } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToscanaApiService {

  api:any;
  url2='https://tolder.toscanaglobal.com/app/api';
	

  constructor(private http: HttpClient,public loadingController: LoadingController) { 
    this.getapi();
  }

  async getapi(){
      this.api= await get("api");
      if (this.api==2) {
        this.url2='https://tg.toscanagroup.com.co/app/api';
      }
      if (this.api==1) {
        this.url2='https://tolder.toscanaglobal.com/app/api';
      }
      console.log(this.api);
      console.log(this.url2);
  }
  

  getlistado(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/getListado.php", JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  addPost(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/auth.php", JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  getbusqueda(dato){
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/getBusqueda.php", JSON.stringify(dato))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  setcontrasena(dato){
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/setContrasena.php", JSON.stringify(dato))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  getgestion(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/getGestiones.php", JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  getcliente(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/getCliente.php", JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  getcantidades(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/getCantidades.php", JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  getcotizacion(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/getCotizacion.php", JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  setactividad(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/setActividad.php", JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  gethistorico(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url2+"/getHistorial.php", JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  showLoader() {

    this.loadingController.create({
      message: 'Buscando Coincidencias...'
    }).then((res) => {
      res.present();
    });

  }

  hideLoader() {

    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }

}
