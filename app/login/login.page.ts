import { Component, OnInit } from '@angular/core';
import { ToscanaApiService } from '../toscana-api.service';
import { get,set } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { NavigationExtras } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordType: string ='password';
  passwordShown: boolean = false;
  arrayPosts:any;
  arrayPosts2:any;
  user:string;
  password:string;
  id:any;
  datos:any;
  name:any;
  regional:any;
  role:any;
  email:any;
  telefono:any;


  constructor(public toscanaApi: ToscanaApiService, public httpclient: HttpClient, public toastCtrl: ToastController, public router: Router, public navCtrl: NavController){
    set("api",'1');
  }

  ngOnInit() {
  }

  Authentication(){
    var data = {email:this.user, password:this.password}
    this.addPost(data);
    
  }

  async presentoast(message:string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  addPost(data) {
    this.toscanaApi.addPost(data)
    .then(data => {
      if(data['error']!=1){
        this.id=data['id'];
        this.name=data['name'];
        this.regional=data['regional'];
        this.role=data['role'];
        this.email=data['email'];
        this.telefono=data['telefono'];
        this.datos={id:this.id};
        console.log(data);
        this.presentoast('Ingreso al sistema con exito');
        let navigationExtras: NavigationExtras = {
          queryParams: {
            data: JSON.stringify(this.datos)
          }
        };
        this.router.navigate(['tabs/tab2'], navigationExtras);
        set("usuario",this.user);
        set("password",this.password);
        set("id",this.id);
        set("nombre",this.name);
        set("regional",this.regional);
        set("role",this.role);
        set("email",this.email);
        set("telefono",this.telefono);
      }else{
        this.presentoast('Usuario o Contraseña incorrecto.');
      }
      this.arrayPosts2 = data;
    })
  }
  

  public togglepassword(){
  	if(this.passwordShown){
  		this.passwordShown = false;
  		this.passwordType = 'password';
  	}else{
  		this.passwordShown = true;
  		this.passwordType = 'text';
  	}
  }

}
