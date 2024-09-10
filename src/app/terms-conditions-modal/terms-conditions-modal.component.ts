import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-conditions-modal',
  templateUrl: './terms-conditions-modal.component.html',
  styleUrls: ['./terms-conditions-modal.component.scss'],
})
export class TermsConditionsModalComponent implements OnInit {
  pdfSrc = 'assets/documents/terms-and-conditions.pdf'; // Assurez-vous que ce chemin est correct
  scrollComplete = false;
  pdfLoaded = false;
  pdfLoadError = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onPdfLoad() {
    this.pdfLoaded = true;
    this.pdfLoadError = false;
  }

  onPdfError(error: any) {
    console.error('Erreur de chargement du PDF', error);
    this.pdfLoadError = true;
    this.pdfLoaded = false;
  }

  onScroll(event: any) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight) {
      this.scrollComplete = true;
    }
  }

  async closeModal(accepted: boolean) {
    await this.modalController.dismiss({ accepted });
  }
}
