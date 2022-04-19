import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { get,set } from '../storage.service';
import { ToscanaApiService } from '../toscana-api.service';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras } from '@angular/router'; 
import { ModalController } from '@ionic/angular';
import { CreacontactoPage } from '../creacontacto/creacontacto.page';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {

	data:any;
	id:any;
	infos:any;
  ahora:any;
  fecha:any;
  today:any;
  manana:any;


  constructor(public route: ActivatedRoute,public router: Router,public toscanaApi: ToscanaApiService, public modalController: ModalController) {

  	this.route.queryParams.subscribe(params => {
	  if (params && params.data) {
	    this.data = JSON.parse(params.data);
	  }
	});

  }

  	async getusuario(){
	    this.id= await get("id");
	    var info_asesor = {asesor:this.id,Gestion:[this.data]}
	    this.getgestion(info_asesor);

	  }


  ngOnInit() {
    this.today = new Date().toISOString().slice(0, 10)
    const hoy = new Date()
    const tomorrow = new Date(hoy)
    tomorrow.setDate(tomorrow.getDate() +1)
    this.manana=tomorrow.toISOString().slice(0, 10)
    var parseada = Date.parse(this.today);
    console.log("hoy:"+this.today);
  	this.getusuario();
    
  }

  async crearcliente(){
    const modal = await this.modalController.create({
      component: CreacontactoPage,
      componentProps: {
        'accion': 'crear',
        'cliente': 0,
      }
    });
    return await modal.present();
  }

  getgestion(data) {
    this.toscanaApi.getgestion(data)
    .then(data => {
      if(data['error']!=1){
        this.infos=data;
        setTimeout(() => {
          this.hideLoader();
        },1000);
        console.log(this.infos);         
      }else{
        console.log("algo fallo.");
        setTimeout(() => {
          this.hideLoader();
        },1000);
      }
    })
    setTimeout(() => {
          this.hideLoader();
        },1000);
  }

  getcliente(id_envio:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id_envio)
      }
    };
    this.router.navigate(['cliente'], navigationExtras);
    this.showLoader();
  }

  getcotiza(id_envio:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id_envio)
      }
    };
    this.router.navigate(['cotizacion'], navigationExtras);
    this.showLoader();
  }
  
  showLoader(){
    this.toscanaApi.showLoader();
  }

  hideLoader() {
    this.toscanaApi.hideLoader();
  }

}
