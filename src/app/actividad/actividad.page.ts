import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { get,set } from '../storage.service';
import { ToscanaApiService } from '../toscana-api.service';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalactividadPage } from '../modalactividad/modalactividad.page';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {

	id:any;
	tele:any;
	hoy:any;
  gestion:string;
  duracion: string;
  observaciones: string;
  id_asesor:any;
  histo:any;


  constructor(public route: ActivatedRoute,public toscanaApi: ToscanaApiService, public modalController: ModalController) { 

  	this.route.queryParams.subscribe(params => {
  	  if (params && params.id) {
  	    this.id = JSON.parse(params.id);
  	    this.tele = JSON.parse(params.tele);
  	  }
	  });

  }

  ngOnInit() {
    var data={id:this.id}
  	this.gethistorico(data);
  	this.registraractividad();
  	setTimeout(() => {
      this.hideLoader();
    },1000);
  }

  mostrarinfo() {

  }

  async traerusuarioid() {
    this.id_asesor = await get('id');
    console.log(this.id_asesor);
  }

  hideLoader() {
    this.toscanaApi.hideLoader();
  }
  registraractividad(){
    this.traerusuarioid();
  }

  async veractividad(codigo: number){
    console.log(codigo);
    const modal = await this.modalController.create({
      component: ModalactividadPage,
      componentProps: { cod: codigo }
    });
    return await modal.present();
  }

  gethistorico(data) {
    this.toscanaApi.gethistorico(data)
    .then(data => {
      if(data['error']!=1){
        this.histo=data;
        console.log(this.histo);
        setTimeout(() => {
          this.hideLoader();
        },1000);        
      }else{
        console.log("algo fallo.");
      }
    })
  }

}
