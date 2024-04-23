// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';  // Importa la interfaz User

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://randomuser.me/api/?results=100'; // URL de la API con 100 resultados

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<User> {
    return this.http.get<User>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Parece que hubo un problema. Intente más tarde.');
  } 

}
