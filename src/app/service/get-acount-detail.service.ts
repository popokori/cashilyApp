import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {
 //private apiUrl = 'https://cashily.ibm-bank.mr/api/getAccountDetails';
  private apiUrl = 'http://localhost:8080/getAccountDetails';

  constructor(private http: HttpClient) { }
  public async getAccountDetails(): Promise<Observable<any>> {
    const token = localStorage.getItem('token');
    const numCompte = localStorage.getItem('numCompte');

    if (!token || !numCompte) {
      throw new Error('Token or Account Number not found in localStorage');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('numerocompte', numCompte);

    return this.http.get(this.apiUrl, { headers, params }).pipe(
      map(response => {
        console.log(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
