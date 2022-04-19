import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { get,set } from '../storage.service';
import { ToscanaApiService } from '../toscana-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

	id:any;
  clientes:any;

  constructor(public route: ActivatedRoute,public toscanaApi: ToscanaApiService) { 

  	this.route.queryParams.subscribe(params => {
	  if (params && params.id) {
	    this.id = JSON.parse(params.id);
      console.log(this.id);
	  }
	});  
  }

  ngOnInit() {
    this.mostrarcliente();
  }

  mostrarcliente(){
    var envio = {cliente:this.id}
    this.getcliente(envio);

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

}
