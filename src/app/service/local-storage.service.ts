import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  token:any;
nom:any;
tokenExpire:any;
numCli:any;
numCompte:any;
 
  constructor() {
  
   }
   public userstorage(response:any,
    ){
   

      localStorage.setItem('token',response.token);
          localStorage.setItem('nom',+response.user.nomFamilleFr+" "+response.user.prenomFr);
          localStorage.setItem('expiryTime',response.user.tokenExpire);
          localStorage.setItem('numCli',response.user.numCli);
          localStorage.setItem('numCompte',response.user.numCompte);
          localStorage.setItem('user',response.user);
          this.token= localStorage.getItem('token');
          this.nom=  localStorage.getItem('nom');
          this.tokenExpire= localStorage.getItem('expiryTime');
          this.numCli=localStorage.getItem('numCli');
          this.numCompte= localStorage.getItem('numCompte');
   }
 public getToken():any{

  return this.token;
 }

 public setToken(token:any){
  localStorage.setItem('token',token);
     
  this.token=token;
 }
 public getNom():any{

  return this.nom;
 }

 public setNom(nom:any){
  this.nom=nom;
 }
 public getTokenExpire():any{

  return this.tokenExpire;
 }

 public setTokenExpire(tokenExpire:any){
  this.tokenExpire=tokenExpire;
 }
 public geNumCompte():any{

  return this.numCompte;
 }

 public setNumCompte(numCompte:any){
  this.numCompte=numCompte;
 }

 public getNumCli():any{

  return this.numCli;
 }

 public setNumCli(numCli:any){
  this.numCli=numCli;
 }
}
