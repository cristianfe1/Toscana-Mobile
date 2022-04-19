import { Component } from '@angular/core';
import { get,set,remove } from '../storage.service';
import { Router } from '@angular/router';
import { ToscanaApiService } from '../toscana-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
	
  nombre:any;
  regional:any;
  role:any;
  email:any;
  telefono:any;

  constructor( public router: Router,public toscanaApi: ToscanaApiService ) {
  	this.sesionusuario();
  }

  	async sesionusuario(){
	  this.nombre = await get("nombre");
	  this.regional= await get("regional");
	  this.role = await get("role");
	  this.email= await get("email");
	  this.telefono= await get("telefono");
	}

	async borrarstorage(){
	await remove("usuario");
	await remove("password");
	await remove("nombre");
	await remove("regional");
	await remove("role");
	await remove("email");
	await remove("telefono");
	await remove("id");
	window.location.replace("/login");
	}

	enviarcontrasena(){
		this.router.navigate(['contrasena']);
    	this.showLoader();
	}

	showLoader(){
	   this.toscanaApi.showLoader();
	}

	hideLoader() {
	   this.toscanaApi.hideLoader();
	}

}
