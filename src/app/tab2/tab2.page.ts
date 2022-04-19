import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router'; 
import { Router } from '@angular/router';
import { ToscanaApiService } from '../toscana-api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { get,set } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

	data:any;
	usua:any;
	pass:any;
	id:any;
	nombre:any;
  asesor:any;
  cant:any;
  contact:string;
  comer:string;
  cotiza:string;
  pedido:string;
  presu:any;
  muestra:any;
  api:any;

	async sesionusuario(){
	  	this.usua= await get("usuario");
	    this.pass= await get("password");
	    this.id= await get("id");
	    this.nombre = await get("nombre");
      this.api = await get("api");
      var asesor = {asesor:this.id};
      this.getcantidades(asesor);
	}

  constructor(public route: ActivatedRoute,public router: Router,public toscanaApi: ToscanaApiService) {

  	this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
      }
    });

  }

  enviarlist(){

    this.router.navigate(['listado']);
    this.showLoader();

  }

  enviarcont(info:string){

  	let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(info)
      }
    };
    this.router.navigate(['gestion'], navigationExtras);
    this.showLoader();
  }

  ngOnInit() {
  	this.sesionusuario();
  }

  getcantidades(data) {
    this.toscanaApi.getcantidades(data)
    .then(data => {
      if(data['error']!=1){
        this.cant=data;
        this.contact=this.cant['contactos'];
        this.comer=this.cant['comerciales'];
        this.cotiza=this.cant['cotizaciones'];
        this.pedido=this.cant['pedidos'];
        this.presu=this.cant['presupuesto'];
        this.muestra=Math.round(this.presu*100);     
      }else{
        console.log("algo fallo.");
      }
    })
  }



  showLoader(){
    this.toscanaApi.showLoader();
  }

  hideLoader() {
    this.toscanaApi.hideLoader();
  }

}
