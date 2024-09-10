import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';
import { PushNotificationService } from '../service/push-notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
nomUser:any;
  constructor( private router: Router,rvice:LocalStorageService,private pushNotificationService: PushNotificationService) { 
    const phoneNumber = localStorage.getItem("numTel");
     // Remplacez par le numéro de téléphone de l'utilisateur connecté
     if(phoneNumber!=null){
    this.pushNotificationService.requestPermission().then(() => {
      this.pushNotificationService.subscribeToNotifications(phoneNumber);
    }).catch(error => {
      console.error('Permission not granted for Notification', error);
    });}
  }
  items = [
    { label: 'Recharges téléphoniques', iconUrl: 'assets/icon/icon-rechargetele.svg' },
    { label: 'Paiement de factures',iconUrl: 'assets/icon/icon-paymentFacture.svg'},
    { label: 'Demande de carnet de chèques',iconUrl: 'assets/icon/icon-carnetche.svg' },
    { label: 'Cartes de crédits', iconUrl: 'assets/icon/icon-cartebancaire.svg' },
    { label: 'Retrait d\'argent',iconUrl: 'assets/icon/icon-retrait.svg' },
    { label: 'B-Pay', iconUrl: 'assets/icon/icon-b-pay.svg' },
  ];

    label1:any= 'Paiements'; 
    iconUrl1:any= 'assets/icon/icon-peiments.svg';
    label2: any='Transferts';
     iconUrl2:any= 'assets/icon/icon-transfert.svg';
    label3:any= 'Comptes'; 
    iconUrl3:any= 'assets/icon/icon-comptes.svg' ;
  
  ngOnInit() {
    this.nomUser=localStorage.getItem("nom");
  
  }
msg(){
  console.log("kg");
  
  this.router.navigateByUrl('/transfert');
}
onhome(){
  console.log("kg");
  this.router.navigateByUrl('/tabs');
}
}
