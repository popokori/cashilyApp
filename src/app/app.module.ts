import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe} from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TermsConditionsModalComponent } from './terms-conditions-modal/terms-conditions-modal.component';
import {  PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [AppComponent, TermsConditionsModalComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,PdfViewerModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
