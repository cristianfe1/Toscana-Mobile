import { Component, OnInit } from '@angular/core';
import { ToscanaApiService } from '../toscana-api.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { NavigationExtras } from '@angular/router'; 

@Component({
  selector: 'app-pasaje',
  templateUrl: './pasaje.page.html',
  styleUrls: ['./pasaje.page.scss'],
})
export class PasajePage implements OnInit {

  asesores:any;
  solicitud:any;
  result:any;
  gestion:any;
  duracion:any;
  observacion:any;
  direccion:any;
  asistente:any;
  cotizacion:any;
  asesor:any;
  myDate: String = new Date().toISOString();
  public contacto = this.navParams.get('contacto');

  constructor(public modalController: ModalController, public toscanaApi: ToscanaApiService, public router: Router, public toastCtrl: ToastController, private navParams: NavParams) { }

  ngOnInit() {
  	let envio= {info:"asesores"}
    this.getdatos(envio);
    console.log(this.contacto);
  }

  pasar(){
  	let crea= { result: this.result, solicitud: this.solicitud, contacto:this.contacto, asistente: this.asistente }
  	this.setpasaje(crea);
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

  dismissModal() {
    this.modalController.dismiss();
  }

  hideLoader() {
    this.toscanaApi.hideLoader();
  }

  showLoader(){
    this.toscanaApi.showLoader();
  }

  setpasaje(data) {
    this.toscanaApi.setpasaje(data)
    .then(data => {
      if (data['error']!=1) {
	    this.presentoast('Enviado a Comercial');
      this.cotizacion=data['id'];
      this.asesor=data['asesor'];
      let crea2= { id:this.cotizacion, duracion:this.duracion, gestion:this.gestion, asesor:this.asesor, f_coti:this.myDate }
      this.setactividad(crea2);
      let navigationExtras: NavigationExtras = {
        queryParams: {
          id: JSON.stringify(this.cotizacion)
        }
      };
      this.router.navigate(['cotizacion'], navigationExtras);
      this.showLoader();
      this.dismissModal();
	  }else{
	    this.presentoast('Erro al crear la visita');
	  }
      setTimeout(() => {
        this.hideLoader();
      },1000); 
    })
  }

  setactividad(data) {
    this.toscanaApi.setactividad(data)
    .then(data => {
      if(data['error']!=1){
        console.log("Ingreso sin problemas"); 
        setTimeout(() => {
          this.hideLoader();
        },1000);        
      }else{
        console.log("algo fallo.");
      }
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
