import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { PushNotificationService } from './service/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  sessionTimeout: any;

  constructor(private router: Router, private navCtrl: NavController, private platform: Platform ){
   
   
    this.resetSessionTimeout();
    this.initializeApp();
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.setStatusBarStyle();
      this.hideSplashScreen();
    });
  }

  setStatusBarStyle() {
    StatusBar.setStyle({ style: Style.Default });
  }

  hideSplashScreen() {
    SplashScreen.hide();
  }

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  resetSessionTimeout() {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }
    this.sessionTimeout = setTimeout(() => {
      this.logout();
    }, 900000); // 1 minute
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    this.navCtrl.navigateRoot('/login');
  }
}
