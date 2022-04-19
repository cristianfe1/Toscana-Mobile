import { Component, OnInit } from '@angular/core';
import { get,set } from '../storage.service';
import { ToastController } from '@ionic/angular';
import { ToscanaApiService } from '../toscana-api.service';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

	passwordType: string ='password';
	passwordType2: string ='password';
	passwordType3: string ='password';
  	passwordShown: boolean = false;
  	passwordShown2: boolean = false;
  	passwordShown3: boolean = false;
  	nombre: string;
  	password: any;
  	actual: any;
  	nueva: any;
  	nueva2: any;
  	usuario: any;

  constructor( public toastCtrl: ToastController,public toscanaApi: ToscanaApiService) { 
  	this.sesionusuario();

  }

  ngOnInit() {
  	this.sesionusuario();

  }

  async sesionusuario(){
	  this.nombre = await get("nombre");
	  this.usuario = await get("usuario");
	  this.password= await get("password");
	  setTimeout(() => {
        this.hideLoader();
      },1000);
	}

  public togglepassword(num: number){
  	if(num==1){
	  	if(this.passwordShown){
	  		this.passwordShown = false;
	  		this.passwordType = 'password';
	  	}else{
	  		this.passwordShown = true;
	  		this.passwordType = 'text';
	  	}
  	}
  	if(num==2){
	  	if(this.passwordShown2){
	  		this.passwordShown2 = false;
	  		this.passwordType2 = 'password';
	  	}else{
	  		this.passwordShown2 = true;
	  		this.passwordType2 = 'text';
	  	}
  	}
  	if(num==3){
	  	if(this.passwordShown3){
	  		this.passwordShown3 = false;
	  		this.passwordType3 = 'password';
	  	}else{
	  		this.passwordShown3 = true;
	  		this.passwordType3 = 'text';
	  	}
  	}
  }

  	actualizapass(){

	  if (this.actual == '' || this.nueva == '' || this.nueva2 == '') {
	  	this.presentoast('Debe Ingresar Todos los Datos');
	  }  		
  	  if(this.password != this.actual){
  	  	this.presentoast('Contraseña Actual Incorrecta.');
  	  }
  	  if(this.nueva != this.nueva2){
  	  	this.presentoast('Las Contraseñas Deben Ser Iguales.');
  	  }
  	  if(this.password == this.actual && this.nueva == this.nueva2){
  	  	var cambio = {nueva:this.nueva,usuario:this.usuario}
  	  	this.setcontrasena(cambio);

  	  	setTimeout(function () {
  	  		window.location.replace("/login");
  	  	}, 3000);
  	  }

  	}

  	async presentoast(message:string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  	}

  	setcontrasena(data) {
    this.toscanaApi.setcontrasena(data)
    .then(data => {
      if(data['error']!=1){ 
      	this.presentoast('Cambio de Contraseña Exitoso.');      
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
