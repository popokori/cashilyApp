import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { SmsService } from '../service/SmsService';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.page.html',
  styleUrls: ['./transfert.page.scss'],
  
})
export class TransfertPage  {
  confirmeTransfer=false;
  montantTxt:any;
  numeroC:any;
  numeroD:any;
  motif:any;
  montantTxtT:any;
  montantCom:any;
  transfertForm: FormGroup;
  constructor( private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private smsService: SmsService,
    private datePipe: DatePipe,
    private router: Router) {


      this.transfertForm=this.formBuilder.group({
        numeroC: ['', [Validators.required, Validators.pattern('^[1-9]{8}$')]],
        montantTxt:['', [Validators.required, Validators.pattern('^[1-9]{6}$')]],
      } );
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
  
goToConfirmeTransfert(){
  this.confirmeTransfer=true;
  console.log("fdfdfddddddddddddddddddd")
  this.montantCom=90;
  
}
backToConfirmeTransfert(){
  this.confirmeTransfer=false;
}

onVerificationNumtelEtSolde(){
  
}
}
