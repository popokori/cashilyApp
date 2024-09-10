import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
// private apiUrl = 'https://cashily.ibm-bank.mr/api/auth'; // Remplacez par l'URL de votre backend
 private apiUrl = 'http://localhost:8080/api/auth'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  sendVerificationCode(numTel: string, nni: string, generatedCode: string): Observable<any> {
    const body = { numTel, nni, codeSecret: generatedCode };
    return this.http.post<any>(`${this.apiUrl}/getcodsecret`, body)
      .pipe(
        catchError(error => {
          console.error('Error sending verification code:', error);
          return throwError(error);
        })
      );
  }

  verifySecretCode(numTel: string, secretCode: string): Observable<any> {
    const requestPayload = { numTel, secretCode };
    return this.http.post(`${this.apiUrl}/verifysecretcode`, requestPayload);
  }

  getPersonneDetails(numtel: string, nni: string): Observable<any> {
    const requestPayload = { numtel, nni, pass: 'IBM_KEY_85_YP_pq' };
    console.log(numtel+'service');
    return this.http.post(`${this.apiUrl}/getPersonneToPhoneOperator`, requestPayload);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
