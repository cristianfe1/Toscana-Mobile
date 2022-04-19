import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { get,set } from '../storage.service';
import { ToscanaApiService } from '../toscana-api.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CreacontactoPage } from '../creacontacto/creacontacto.page';
import { PasajePage } from '../pasaje/pasaje.page';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

	id:any;
  clientes:any;
  api:any;

  constructor(public route: ActivatedRoute,public toscanaApi: ToscanaApiService, public modalController: ModalController) { 

  	this.route.queryParams.subscribe(params => {
	  if (params && params.id) {
	    this.id = JSON.parse(params.id);
      console.log(this.id);
      setTimeout(() => {
        this.hideLoader();
      },1000);
	  }
	});  
  }

  ngOnInit() {
    this.mostrarcliente();
    this.getapi();
    setTimeout(() => {
      this.hideLoader();
    },1000);
  }

  mostrarcliente(){
    var envio = {cliente:this.id}
    this.getcliente(envio);

  }

  async getapi(){
    this.api= await get("api");
  }

  async editarcliente(){
    const modal = await this.modalController.create({
      component: CreacontactoPage,
      componentProps: {
        'accion': 'editar',
        'cliente': this.id,
      }
    });
    return await modal.present();
  }

  async enviarcomercial(){
    const modal = await this.modalController.create({
      component: PasajePage,
      componentProps: {
        'contacto': this.id,
      }
    });
    return await modal.present();
  }

  getcliente(data) {
    this.toscanaApi.getcliente(data)
    .then(data => {
      if(data['error']!=1){
        this.clientes=data;
        console.log(this.clientes);
        setTimeout(() => {
          this.hideLoader();
        },1000);       
      }else{
        console.log("algo fallo.");
      }
    })
  }

  hideLoader() {
    this.toscanaApi.hideLoader();
  }

  showLoader(){
    this.toscanaApi.showLoader();
  }

}
