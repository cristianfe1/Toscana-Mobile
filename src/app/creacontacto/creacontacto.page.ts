import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToscanaApiService } from '../toscana-api.service';
import { Router } from '@angular/router';
import { get,set,remove } from '../storage.service';
import { NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-creacontacto',
  templateUrl: './creacontacto.page.html',
  styleUrls: ['./creacontacto.page.scss'],
})
export class CreacontactoPage implements OnInit {

  zonas:any;
  asesores:any;
  asesor:any;
  nombre:any;
  apellido:any;
  profesion:any;
  genero:any;
  telefono:any;
  celular:any;
  email:any;
  origen:any;
  referido:any;
  tomado:any;
  ciudad:any;
  direccion:any;
  linea:any;
  consulta:any;
  anotacion:any;  
  contact:any;
  zona:any;
  id:any;
  accion:any;
  cliente:any;
  clientes:any;
  temp:any;
  datos:any;
  contacto_creado:any;
  temporal:any;
  buttonDisabled:any;


  constructor(public modalController: ModalController, public alertController: AlertController, public toscanaApi: ToscanaApiService, public toastCtrl: ToastController, public router: Router, public navParams: NavParams) { this.accion=navParams.get('accion'); this.cliente=navParams.get('cliente'); this.temp = []; }

  ngOnInit() {
    let envio= {info:"asesores"}
    this.getdatos(envio);
    let envio2= {info:"zonas"}
    this.getdatos2(envio2);
    this.getid();
    console.log(this.cliente);
    if (this.cliente>0) {
      let pasa = {cliente:this.cliente}
      this.getcliente(pasa);
    }
    this.buttonDisabled=false;    
  }
  async getid(){
    this.id= await get("id");
    console.log(this.id);
  }

  async presentoast(message:string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contacto Repetido',
      message: 'Este contacto ya fue creado en el sistema.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  CreaContacto(){
    if (this.accion=="crear") {
      let crea= {accion: this.accion, asesor: this.asesor, nombres: this.nombre, apellidos: this.apellido, profesion: this.profesion, genero: this.genero, telefono: this.telefono, celular: this.celular, email: this.email, origen: this.origen, referido: this.referido, tomado: this.tomado, ciudad: this.ciudad, direccion: this.direccion, linea_producto: this.linea, observaciones: this.consulta, anotaciones: this.anotacion, departamento: this.zona, creado_por: this.id}
      console.log(crea);
      this.newcontacto(crea);
      this.dismissModal();
    }
    if (this.accion=="editar") {
      if (this.asesor== null) {
        this.asesor=this.temp.asignado_a
      }
      if (this.nombre== null) {
        this.nombre=this.temp.nombres
      }
      if (this.apellido== null) {
        this.apellido=this.temp.apellidos
      }
      if (this.profesion== null) {
        this.profesion=this.temp.profesion
      }
      if (this.genero== null) {
        this.genero=this.temp.genero
      }
      if (this.telefono== null) {
        this.telefono=this.temp.telefono
      }
      if (this.celular== null) {
        this.celular=this.temp.celular
      }
      if (this.email== null) {
        this.email=this.temp.email
      }
      if (this.origen== null) {
        this.origen=this.temp.origen
      }
      if (this.referido== null) {
        this.referido=this.temp.referido
      }
      if (this.tomado== null) {
        this.tomado=this.temp.tomado
      }
      if (this.ciudad== null) {
        this.ciudad=this.temp.ciudad
      }
      if (this.direccion== null) {
        this.direccion=this.temp.direccion
      }
      if (this.linea== null) {
        this.linea=this.temp.linea_producto
      }
      if (this.consulta== null) {
        this.consulta=this.temp.observaciones
      }
      if (this.anotacion== null) {
        this.anotacion=this.temp.anotaciones
      }
      if (this.zona== null) {
        this.zona=this.temp.departamento
      }
      let crea2= {accion: this.accion, asesor: this.asesor, nombres: this.nombre, apellidos: this.apellido, profesion: this.profesion, genero: this.genero, telefono: this.telefono, celular: this.celular, email: this.email, origen: this.origen, referido: this.referido, tomado: this.tomado, ciudad: this.ciudad, direccion: this.direccion, linea_producto: this.linea, observaciones: this.consulta, anotaciones: this.anotacion, departamento: this.zona, creado_por: this.id, id: this.cliente}
      console.log(crea2);
      this.newcontacto(crea2);
      this.dismissModal();
      this.router.navigate(['tabs/tab2']);
    }
    this.getultimocliente('get');

  }

  onChangeTel(event){

    if(event.length>=10){
      console.log(event);
      let informa = {validar_telefono:event}
      this.getvalidatelefono(informa);
    }
    if(event.length==0){
      this.buttonDisabled=false;
    }
    
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

  getdatos(data) {
    this.toscanaApi.getdatos(data)
    .then(data => {
      if(data['error']!=1){
        this.asesores=data;
        console.log(this.asesores); 
        setTimeout(() => {
          this.hideLoader();
        },1000);        
      }else{
        console.log("algo fallo.");
      }
    })
  }

  newcontacto(data) {
    this.toscanaApi.newcontacto(data)
    .then(data => {
      if(data['error']!=1){
        if (data=="Contacto Creado") {
          this.presentoast('Contacto Creado');
        }else if (data=="Contacto Editado"){
          this.presentoast('Contacto Editado');
        }else{
          this.presentoast('Erro al crear el Contacto');
        }
        setTimeout(() => {
          this.hideLoader();
        },1000);        
      }else{
        console.log("algo fallo.");
      }
    })
  }

  getdatos2(data) {
    this.toscanaApi.getdatos(data)
    .then(data => {
      if(data['error']!=1){
        this.zonas=data;
        console.log(this.zonas); 
        setTimeout(() => {
          this.hideLoader();
        },1000);        
      }else{
        console.log("algo fallo.");
      }
    })
  }

  getcliente(data) {
    this.toscanaApi.getcliente(data)
    .then(data => {
      if(data['error']!=1){
        this.clientes=data;
        //console.log(this.clientes);
        this.temp=this.clientes[0];
        console.log(this.temp);
        setTimeout(() => {
          this.hideLoader();
        },1000);       
      }else{
        console.log("algo fallo.");
      }
    })
  }

  getultimocliente(data) {
    this.toscanaApi.getultimocliente(data)
    .then(data => {
      if(data['error']!=1){
        this.contacto_creado=data;
        console.log(this.contacto_creado);
        setTimeout(() => {
          this.hideLoader();
        },1000);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            id: this.contacto_creado
          }
        };
        this.router.navigate(['cliente'], navigationExtras);
        this.showLoader();  
      }else{
        console.log("algo fallo.");
      }
    })
  }

  getvalidatelefono(data) {
    console.log('ingreso');
    this.toscanaApi.getvalidatelefono(data)
    .then(data => {
      if(data['error']!=1){
        this.temporal=data;
        //console.log(this.clientes);
        console.log(this.temporal);
        if(this.temporal[0]['repetido']>0){
          this.presentAlert();
          this.buttonDisabled=true;
        }else{
          this.buttonDisabled=false;
        }

      }else{
        console.log("algo fallo.");
      }
    })
  }

}
