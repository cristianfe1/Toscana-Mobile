import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Geolocation} from '@capacitor/geolocation';
import { get,set } from '../storage.service';
import { ToscanaApiService } from '../toscana-api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  public valor = this.navParams.get('valor');
  public fecha = this.navParams.get('fecha')
  val:string;
  obse:string
  latitude:any;
  longitude:any;
  asesor:any;
  histo:any;
  visita:any;

  constructor(public modalController: ModalController, private navParams: NavParams,public toscanaApi: ToscanaApiService,public toastCtrl: ToastController) { }

  ngOnInit() {
    let data={tipo:'visita',id:this.valor}
    console.log(data);
    this.gethistorico(data);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log(this.latitude);
    console.log(this.longitude);
    this.asesor = await get("id");
    var informacion = {lat:this.latitude,lng:this.longitude,id:this.visita,duracion:0,gestion:'visita inicial',asesor:this.asesor,extra:this.val,extra2:this.obse,f_coti:this.fecha}
    console.log(informacion);
    this.setactividad(informacion);
    this.presentoast('Actividad Registrada con Exito.');
    this.dismissModal();
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

  gethistorico(data) {
    console.log(data);
    this.toscanaApi.gethistorico(data)
    .then(data => {
      if(data['error']!=1){
        this.histo=data;
        console.log(this.histo);
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

  hideLoader() {
    this.toscanaApi.hideLoader();
  }

  showLoader(){
    this.toscanaApi.showLoader();
  }

}
