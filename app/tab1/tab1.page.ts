import { Component, OnInit } from '@angular/core';
import { ToscanaApiService } from '../toscana-api.service'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { QueryList, ViewChildren } from '@angular/core'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  passwordType: string ='password';
  passwordShown: boolean = false;
  posts: any; 
  Mi_Busqueda:any;
  disableDelete:any;


  constructor(public toscanaApi: ToscanaApiService, public httpclient: HttpClient,public toastCtrl: ToastController,public router: Router) {}

  ngOnInit() {
    
  }

  async presentoast(message:string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  /*@ViewChildren('sliding') itemSlidingList: QueryList<IonItemSliding>;
  deleteWidgets(){
    this.disableDelete = false;
    this.itemSlidingList.forEach((itemSlide) =>{
        itemSlide.open('start');
    });
  }*/

  getItems(){
    var q = {buscar:this.Mi_Busqueda}
    console.log(q);
    if(this.Mi_Busqueda.length > 2){
      this.showLoader();
    	this.getbusqueda(q);
    }else{
      this.presentoast("Mayor a tres caracteres.");
    }
  }

  getbusqueda(dato){
  	this.toscanaApi.getbusqueda(dato)
  	.then(data => {	
      if(data['error']!=1){
      	this.posts= data;
        console.log(this.posts);
      }else{
        console.log("No hay usuarios existentes con este nombre");
      }
      setTimeout(() => {
        this.hideLoader();
      },1000);
    })
  }

  showLoader(){
    this.toscanaApi.showLoader();    
  }

  hideLoader() {
    this.toscanaApi.hideLoader();
  }

  enviarcont(id_envio:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id_envio)
      }
    };
    this.router.navigate(['cliente'], navigationExtras);
    this.showLoader();
  }

  enviarcoti(id_envio:string){
    if (id_envio!='0') {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          id: JSON.stringify(id_envio)
        }
      };
      this.router.navigate(['cotizacion'], navigationExtras);
      this.showLoader();
    }else{
      this.presentoast("Este Cliente no cuenta con cotizacion.");
    }
  }

}
