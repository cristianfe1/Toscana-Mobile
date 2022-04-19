import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { get,set } from '../storage.service';
import { ToscanaApiService } from '../toscana-api.service';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Geolocation} from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { PedidoPage } from '../pedido/pedido.page';
import { VisitaPage } from '../visita/visita.page';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.page.html',
  styleUrls: ['./cotizacion.page.scss'],
})
export class CotizacionPage implements OnInit {

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  interval;
  tele: number;
	id:any;
  cotizaciones:any;
  latitude: number;
  longitude: number;
  api:any;
  hoy:any;
  asesor:any;
  tiempo:number;

  constructor(public route: ActivatedRoute,public toscanaApi: ToscanaApiService,public router: Router,public toastCtrl: ToastController, public alertController: AlertController, public modalController: ModalController) {

  	this.route.queryParams.subscribe(params => {
	  if (params && params.id) {
	    this.id = JSON.parse(params.id);
	  }
	});

  }

  async getapi(){

    this.api = await get("api");
    this.asesor = await get("id");

  }

  ngOnInit() {
    this.mostrarcotiza();
    this.getapi();
    this.hoy = new Date().toISOString();
    console.log(this.hoy);

  }

   async getLocation(id_coti: number,data: string) {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log(this.latitude);
    console.log(this.longitude);
    this.creardata(this.latitude, this.longitude,id_coti,0,'visita inicial',data);
  }

  mostrarcotiza(){
    var envio = {cotizacion:this.id}
    this.getcotizacion(envio);

  }

  registroAlertRadio(id_coti: number) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id_coti)
      }
    };
    this.router.navigate(['cliente'], navigationExtras);
    this.showLoader();  

  }

  async presentAlertRadio(id_coti: number,f_coti: any) {
    /*const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Seleccione Resultado de la Visita.',
      inputs: [
        {
          name: 'Verde',
          type: 'radio',
          label: 'Verde',
          value: 'verde',
          handler: () => {
            console.log('Verde Seleccionado');
          },
          checked: true
        },
        {
          name: 'Amarillo',
          type: 'radio',
          label: 'Amarillo',
          value: 'amarillo',
          handler: () => {
            console.log('Amarillo Seleccionado');
          }
        },
        {
          name: 'Rojo',
          type: 'radio',
          label: 'Rojo',
          value: 'rojo',
          handler: () => {
            console.log('Rojo Seleccionado');
          }
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data:string) => {
            console.log(id_coti);
            console.log(data);
            this.getLocation(id_coti,data);

          }
        }
      ]
    });   

    await alert.present();*/

    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { valor: id_coti,fecha: f_coti }
    });

    return await modal.present();

  }

  async crearvisita(id_coti: number){
    const modal = await this.modalController.create({
      component: VisitaPage,
      componentProps: { valor: id_coti }
    });
    return await modal.present();
  }

  async datospedido(id_coti: number,f_coti: any){

    const modal = await this.modalController.create({
      component: PedidoPage,
      componentProps: { valor: id_coti,fecha: f_coti }
    });
    this.showLoader();
    return await modal.present();
    
  }
  

  contador(){
    this.timer= 0;
    this.interval=setInterval(() => {
        this.timer++;
        console.log(this.timer);
    },1000);
  }

  detener(id_coti:number){
    clearInterval(this.interval);
    //console.log(this.timer);
    if (this.timer > 0) {
      this.tiempo = Math.round(this.timer/60);
      if(this.tiempo == 0){
        this.tiempo=1;
      }
      this.creardata('','',id_coti,this.tiempo,'llamada','');
    }
    this.timer=0;
    
  }

  pdf(id_coti:number){
    console.log(id_coti);
    if (this.api==1) {
      window.open("http://tolder.toscanaglobal.com/impresion/pdf/cotizacion.php?id="+id_coti,'_system', 'location=yes');
    }
    if (this.api==2){
      window.open("https://tg.toscanagroup.com.co/impresion/pdf/cotizacion.php?id="+id_coti,'_system', 'location=yes');
    }
    
  }

  creardata(lat:any,lng:any,id_coti:number,dura:number,accion:string,data:string){
    var informacion = {lat:lat,lng:lng,id:id_coti,duracion:dura,gestion:accion,asesor:this.asesor,extra:data}
    this.setactividad(informacion);
    this.presentoast('Actividad Registrada con Exito.');
  }

  verpedido(id_envio:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id_envio)
      }
    };
    this.router.navigate(['pedido'], navigationExtras);
    this.showLoader();

  }

  enviarcont(id_envio:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id_envio)
      }
    };
    this.router.navigate(['cliente'], navigationExtras);
    this.showLoader();
  }

  getcotizacion(data) {
    this.toscanaApi.getcotizacion(data)
    .then(data => {
      if(data['error']!=1){
        this.cotizaciones=data;
        console.log(this.cotizaciones); 
        setTimeout(() => {
          this.hideLoader();
        },1000);        
      }else{
        console.log("algo fallo.");
      }
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

  veractividad(id_envio:string,telefono:string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id_envio),
        tele: JSON.stringify(telefono)
      }
    };
    this.router.navigate(['actividad'], navigationExtras);
    this.showLoader();
  }

  hideLoader() {
    this.toscanaApi.hideLoader();
  }

  showLoader(){
    this.toscanaApi.showLoader();
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
