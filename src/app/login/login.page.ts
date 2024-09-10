import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { loginRequest } from '../model/login.request';
import { Device } from '@capacitor/device';
import { RegisterPage } from '../register/register.page';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  deviceId: string = '';
  sessionTimeout: any;
  cliquedl:boolean=false;
  cliquedp:boolean=false;
  component = RegisterPage;

  constructor(private localService:LocalStorageService,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
   
  ) {}
  ngOnInit(): void {
    this.localService.setToken(null);
  }

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message,
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
    await loading.present();
    return loading;
  }

  async onLogin() {
    if (!this.validateUsername()) {
      this.cliquedl=true;
    //  this.presentAlert('Erreur', 'Le numero de telphone  doit être de 8 chiffres.');
      return;
    }
    this.cliquedl=false;
    if (!this.validatePassword()) {
      this.cliquedp=true;
     
    //  this.presentAlert('Erreur', 'Le PIN doit être de 4 chiffres.');
      return;
    }
    
    this.cliquedp=false;
    const loading = await this.presentLoading('Authentification encours');
    try {
      const deviceInfo = await Device.getId();
      this.deviceId = deviceInfo.identifier;
      console.log(this.deviceId);
      const user1 = new loginRequest(this.username, this.password, "2a59cc37-ae45-471e-b365-90cc72cebb34");
      
      this.authService.login(user1).pipe(
        catchError(error => {
         loading.dismiss();
          console.error('Login error', error);
          this.presentAlert('Erreur', 'Invalid credentials or server error');
          return of(null); // Return a null observable to continue the stream
        })
      ).subscribe(async response => {
        if (response) {
          //await this.storage.setUser(response.user);
          localStorage.setItem('token',response.token);
          localStorage.setItem('nom',response.user.nomFamilleFr+" "+response.user.prenomFr);
          localStorage.setItem('expiryTime',response.user.tokenExpire);
          localStorage.setItem('numCli',response.user.numCli);
          localStorage.setItem('numCompte',response.user.numCompte);
          localStorage.setItem('user',response.user);
          localStorage.setItem('numTel',response.numTel);
          console.log( response);
          
          this.resetSessionTimeout();
          await loading.dismiss();
          this.router.navigateByUrl('/home');
         
          //await this.presentSuccessToast('Connexion réussie');
          
        }
      });
    } catch (error) {
      console.error('Error getting device ID', error);
      this.presentAlert('Erreur', 'Failed to get device ID');
      await loading.dismiss();
    }
  }
 
  validatePassword(): boolean {
    const regex = /^\d{4}$/;
    return regex.test(this.password);
  }
  validateUsername(): boolean {
    const regex = /^\d{8}$/;
    return regex.test(this.username);
  }

  resetSessionTimeout() {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }
    this.sessionTimeout = setTimeout(() => {
      this.logout();
    }, 60000); // 1 minute
  }

  logout() {
    localStorage.removeItem('user');
    this.navCtrl.navigateRoot('/login');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      cssClass: 'custom-toast'
    });
    toast.present();
  }

  goToRegister(){
    console.log("kg");
    this.router.navigateByUrl('/register');
  }
}
