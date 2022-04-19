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
  empresa:any;
  ishidden:any;
  showdden:any;
  nom_empresa:any;
  recordar:any;

  constructor(public toscanaApi: ToscanaApiService, public httpclient: HttpClient, public toastCtrl: ToastController, public router: Router, public navCtrl: NavController){
    


  }

  async ngOnInit() {

    if (window.localStorage.getItem("Empre_login") != null) {

      this.showdden="";
      this.ishidden=1;
      this.empresa=window.localStorage.getItem("Empre_login");
      if (window.localStorage.getItem("Empre_login")=="1") {
        this.nom_empresa="Tolder"
      }
      if (window.localStorage.getItem("Empre_login")=="2") {
        this.nom_empresa="Toscana"
      }
      set("api", this.empresa);
      await this.toscanaApi.getapi();
      if (window.localStorage.getItem("usua") != null && window.localStorage.getItem("pass") != null) {
          this.user=window.localStorage.getItem("usua");
          this.password=window.localStorage.getItem("pass");
          var data = {email:this.user, password:this.password, empresa:this.empresa}
          this.addPost(data);
      }
      

    }else{
      console.log("no tiene sesion");
      this.showdden=1;
    }

    
  }

  Authentication(){
    var data = {email:this.user, password:this.password, empresa:this.empresa}
    this.addPost(data);
  }

  prueba(){
    this.showdden=1;
    this.ishidden="";
  }

  async presentoast(message:string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }



  onChange(){
    //console.log(this.empresa);
    this.ishidden=1;
    this.showdden="";
    set("api",this.empresa);
    this.toscanaApi.getapi();
    window.localStorage.setItem("Empre_login", this.empresa);
    if (window.localStorage.getItem("Empre_login")=="1") {
      this.nom_empresa="Tolder"
    }
    if (window.localStorage.getItem("Empre_login")=="2") {
      this.nom_empresa="Toscana"
    }
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
        if (this.recordar==true) {
          window.localStorage.setItem("usua", this.user);
          window.localStorage.setItem("pass", this.password);
        }
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
