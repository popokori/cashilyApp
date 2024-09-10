import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginRequest } from '../model/login.request';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private loginUrl = 'https://cashily.ibm-bank.mr/api/auth/login';
  private loginUrl = 'http://localhost:8080/api/auth/login'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  login(user: loginRequest): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  
}
