import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { SmsService } from '../service/SmsService';
import { trigger, style, animate, transition } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class RegisterPage {
  registerForm: FormGroup;
  component = LoginPage;
  secretCodeForm: FormGroup;
  fullRegisterForm: FormGroup;
  showSecretCodeInput = false;
  showFullRegisterForm = false;
  showAdditionalFields = false;
  isvi=true;
  pass=true;
  hisdenpas=true; // Pour afficher les champs supplémentaires
  timer: any;
  timeLeft: number = 60;
  generatedCode: string = '';
  numTelpho: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private smsService: SmsService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      numTel: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      nni: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });

    this.secretCodeForm = this.formBuilder.group({
      secretCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });

    this.fullRegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?!0123|1234|2345|3456|4567|5678|6789|7890|0987|9876|8765|7654|6543|5432|4321)\d{4}$/)
      ]],
      confirmPassword: ['', Validators.required],
      deviceId: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      img: ['', Validators.required],
      lieuNaissanceAr: ['', Validators.required],
      lieuNaissanceFr: ['', Validators.required],
      messageError: ['', Validators.required],
      nationaliteIso: ['', Validators.required],
      nni: ['', Validators.required],
      nomFamilleAr: ['', Validators.required],
      nomFamilleFr: ['', Validators.required],
      prenomAr: ['', Validators.required],
      prenomFr: ['', Validators.required],
      prenomPereAr: ['', Validators.required],
      prenomPereFr: ['', Validators.required],
      sexeFr: ['', Validators.required],
      numCli: ['', Validators.required],
      numCompte: ['', Validators.required],
      soldeIndicative: ['', Validators.required],
      numTel: ['', Validators.required],
      typeCli: ['', Validators.required],
      langue: ['', Validators.required],
      dateheurCreation: ['', Validators.required],
      dateDernierCredi: ['', Validators.required],
      dateDernierDebit: ['', Validators.required],
      dateDernierConnection: ['', Validators.required],
      totalCredit: ['', Validators.required],
      totalDebit: ['', Validators.required],
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });
  }
Next(){
this.pass=false
this.showAdditionalFields=true;

}
precedent(){
  this.pass=true;
  this.showAdditionalFields=false;
}
  mustMatch(controlName: string, matchingControlName: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
        this.isvi=false;
        return { mustMatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
    
  }

  generateSecretCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  startTimer() {
    this.timeLeft = 60;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.showSecretCodeInput = false;
        this.presentAlert('Erreur', 'Le délai de saisie du code de sécurité est écoulé.');
        window.location.reload();
      }
    }, 1000);
  }

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message,
      spinner: 'crescent'
    });
    await loading.present();
    return loading;
  }

  onSubmit() {
    const { numTel, nni } = this.registerForm.value;
    this.numTelpho = numTel;
    this.generatedCode = this.generateSecretCode();

    this.presentLoading('Envoi du code...').then(loading => {
      this.smsService.sendVerificationCode(numTel, nni, this.generatedCode).subscribe(
        async (response: any) => {
          await loading.dismiss();
          if (response.success) {
            this.showSecretCodeInput = true;
            this.startTimer();
          } else {
            this.presentAlert('Erreur', 'Numéro de téléphone ou NNI invalide.');
          }
        },
        async (error) => {
          await loading.dismiss();
          this.presentAlert('Erreur', error.error.message);
          // Rafraîchir la page en cas d'erreur
         // window.location.reload();
         this.registerForm.reset();
        }
      );
    });
  }

   onVerifySecretCode() {
    Device.getId().then(info => {
    clearInterval(this.timer);
    const { secretCode } = this.secretCodeForm.value;
  
    if (secretCode === this.generatedCode) {
      this.presentLoading('Vérification du code...').then(loading => {
        this.smsService.getPersonneDetails(this.numTelpho, this.registerForm.value.nni).subscribe(
          async (personne: any) => {
            this.showSecretCodeInput = false;
           
           
            const now = new Date();
            this.fullRegisterForm.patchValue({
              lieuNaissanceFr: personne.lieuNaissanceFr,
              nomFamilleFr: personne.nomFamilleFr,
              prenomFr: personne.prenomFr,
              prenomPereFr: personne.prenomPereFr,
              sexeFr: personne.sexeFr,
              nni: personne.nni,
              numTel: this.numTelpho,
              username: this.numTelpho,
              password: this.fullRegisterForm.value.password,
              deviceId: info.identifier,
              dateNaissance: personne.dateNaissance,
              img: personne.img,
              lieuNaissanceAr: personne.lieuNaissanceAr,
              messageError: personne.messageError,
              nationaliteIso: personne.nationaliteIso,
              nomFamilleAr: personne.nomFamilleAr,
              prenomAr: personne.prenomAr,
              prenomPereAr: personne.prenomPereAr,
              numCli: 'null',
              numCompte: 'null',
              soldeIndicative: 0,
              typeCli: '01',
              langue: 'Fr',
              dateheurCreation: this.datePipe.transform(now, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
              dateDernierCredi: 'null',
              dateDernierDebit: 'null',
              dateDernierConnection: 'null',
              totalCredit: 0,
              totalDebit: 0,
            });
            this.showFullRegisterForm = true;
            await loading.dismiss();
           
          },
          async (error) => {
            await loading.dismiss();
            this.presentAlert('Erreur', error.message)
            // Rafraîchir la page en cas d'erreur
            window.location.reload();
          }
        );
      });
    } else {
      this.presentAlert('Erreur', 'Code secret invalide.');
     // clearInterval(this.timer);
      

    }
  }).catch(error => {
    console.error('Error getting device ID', error);
    
    this.presentAlert('Erreur', 'Failed to get device ID');
           
  });
  }

  onFullRegister() {
    if (this.fullRegisterForm.invalid) {
      this.presentValidationErrors(this.fullRegisterForm);
      return;
    }
    const fullRegisterData = this.fullRegisterForm.value;
    this.presentLoading('Enregistrement...').then(loading => {
      this.smsService.registerUser(fullRegisterData).subscribe(
        async (response: any) => {
          await loading.dismiss();
          if (response.success) {
            this.presentAlert('Succès', 'Inscription réussie.');
            console.log("opo")
            this.router.navigate(['/login'], { replaceUrl: true });
          } else {
            this.presentAlert('Erreur', 'Inscription échouée.');
            window.location.reload();
          }
        },
        async (error) => {
          await loading.dismiss();
          this.presentAlert('Erreur', 'Une erreur s\'est produite. Veuillez réessayer.');
          // Rafraîchir la page en cas d'erreur
          window.location.reload();
        }
      );
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentValidationErrors(formGroup: FormGroup) {
    const invalidControls = this.findInvalidControls(formGroup);
    const messages = invalidControls.map(control => "Le champ "+control+"est invalide.");
    const alert = await this.alertController.create({
      header: 'Erreurs de validation',
      message: messages.join('<br>'),
      buttons: ['OK'],
    });
    await alert.present();
  }

  findInvalidControls(formGroup: FormGroup): string[] {
    const invalid = [];
    const controls = formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}