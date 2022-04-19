import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { get,set } from '../storage.service';
import { ToscanaApiService } from '../toscana-api.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  @Input("value") valor;
  pedido:any;

  constructor(public modalController: ModalController, private navParams: NavParams, public toscanaApi: ToscanaApiService) {

  }

  ngOnInit() {
  	console.log(this.valor);
  	this.mostrarpedido();
  }

  mostrarpedido() {
  	var envio = {cotizacion:this.valor}
    this.getpedido(envio);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  getpedido(data) {
    this.toscanaApi.getpedido(data)
    .then(data => {
      if(data['error']!=1){
        this.pedido=data;
        console.log(this.pedido); 
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

  showLoader(){
    this.toscanaApi.showLoader();
  }

}
