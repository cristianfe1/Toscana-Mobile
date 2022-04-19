import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToscanaApiService } from '../toscana-api.service';

@Component({
  selector: 'app-modalactividad',
  templateUrl: './modalactividad.page.html',
  styleUrls: ['./modalactividad.page.scss'],
})
export class ModalactividadPage implements OnInit {

  cod:any;
  acti:any;

  constructor(public route: ActivatedRoute, public modalController: ModalController, public toscanaApi: ToscanaApiService) {
    this.route.queryParams.subscribe(params => {
      
        this.cod = JSON.parse(params.cod);
      
    });
  }

  ngOnInit() {
    var data={cod:this.cod}
    this.gethistorico(data);
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

  gethistorico(data) {
    this.toscanaApi.gethistorico(data)
    .then(data => {
      if(data['error']!=1){
        this.acti=data;
        console.log(this.acti);
        setTimeout(() => {
          this.hideLoader();
        },1000);        
      }else{
        console.log("algo fallo.");
      }
    })
  }

}
