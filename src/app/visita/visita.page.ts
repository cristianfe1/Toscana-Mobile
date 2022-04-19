import { Component, OnInit } from '@angular/core';
import { ToscanaApiService } from '../toscana-api.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-visita',
  templateUrl: './visita.page.html',
  styleUrls: ['./visita.page.scss'],
})
export class VisitaPage implements OnInit {

	zonas:any;
  	asesores:any;
  	myDate: String = new Date().toISOString();
  	gestion: any;
  	asesor: any;
  	tomado: any;
  	duracion: any;
  	observacion: any;
  	direccion: any;
  	linea: any;
  	public valor = this.navParams.get('valor');

  constructor( public toscanaApi: ToscanaApiService, public modalController: ModalController, private navParams: NavParams, public router: Router, public toastCtrl: ToastController) { }

  ngOnInit() {
  	let envio= {info:"asesores"}
    this.getdatos(envio);
    let envio2= {info:"zonas"}
    this.getdatos2(envio2);
  }

  getdatos(data) {
	this.toscanaApi.getdatos(data)
    .then(data => {
      if(data['error']!=1){
        this.asesores=data;
        console.log(this.asesores); 
        setTimeout(() => {
          this.hideLoader();
        },1000);        
      }else{
        console.log("algo fallo.");
      }
    })
  }

  getdatos2(data) {
    this.toscanaApi.getdatos(data)
    .then(data => {
      if(data['error']!=1){
        this.zonas=data;
        console.log(this.zonas); 
        setTimeout(() => {
          this.hideLoader();
        },1000);        
      }else{
        console.log("algo fallo.");
      }
    })
  }

  dismissModal() {
	this.modalController.dismiss();
  }

  hideLoader() {
	this.toscanaApi.hideLoader();
  }

  showLoader(){
	this.toscanaApi.showLoader();
  }

  Creavisita(){
  	console.log(this.gestion);
  	console.log(this.asesor);
  	console.log(this.direccion);
  	let crea= { gestion: this.gestion, asesor: this.asesor,  tomado: this.tomado, fecha: this.myDate, duracion: this.duracion, observaciones: this.observacion, direccion: this.direccion, linea_producto: this.linea, id: this.valor  }
  	console.log(crea);
  	this.setactividad(crea);
  	this.dismissModal();
  	this.router.navigate(['tabs/tab2']);
  }

  setactividad(data) {
    this.toscanaApi.setactividad(data)
    .then(data => {
      if (data['error']!=1) {
	    this.presentoast('Visita Creada');
	  }else{
	    this.presentoast('Erro al crear la visita');
	  }
      setTimeout(() => {
        this.hideLoader();
      },1000); 
    })
  }

  async presentoast(message:string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}