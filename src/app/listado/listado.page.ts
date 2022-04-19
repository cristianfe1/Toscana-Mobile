import { Component, OnInit } from '@angular/core';
import { ToscanaApiService } from '../toscana-api.service';
import { get,set } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras } from '@angular/router'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  lista1:any;
  lista2:any;
  lista3:any;
  nombre1:any;
  nombre2:any;
  nombre3:any;
  regional:any;

  constructor( public toscanaApi: ToscanaApiService, public router: Router ) {

    this.sesionusuario();

  }

  ngOnInit() {
  }

  async sesionusuario(){
      this.regional= await get("regional");
      var hoy = {fecha:"hoy",regional:this.regional}
      var mana = {fecha:"manana",regional:this.regional}
      var resto = {fecha:"semana",regional:this.regional}
      this.getlistado1(hoy);
      this.getlistado2(mana);
      this.getlistado3(resto);
  }

  getlistado1(data) {
    this.toscanaApi.getlistado(data)
    .then(data => {
      if(data['error']!=1){
        setTimeout(() => {
          this.hideLoader();
        },1000);
          this.lista1=data;
          this.nombre1=this.lista1[0]['dia'];
          console.log(this.lista1);
      }else{
        console.log("algo fallo.");
      }
    })
  }

  getlistado2(data) {
    this.toscanaApi.getlistado(data)
    .then(data => {
      if(data['error']!=1){
        setTimeout(() => {
          this.hideLoader();
        },1000);
          this.lista2=data;
          this.nombre2=this.lista2[0]['dia'];
      }else{
        console.log("algo fallo.");
      }
    })
  }


  getlistado3(data) {
    this.toscanaApi.getlistado(data)
    .then(data => {
      if(data['error']!=1){
        setTimeout(() => {
          this.hideLoader();
        },1000);
          this.lista3=data;
          this.nombre3=this.lista3[0]['dia'];
          console.log(this.lista3);
      }else{
        console.log("algo fallo.");
      }
    })
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
