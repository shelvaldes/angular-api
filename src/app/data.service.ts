// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';  // Importa la interfaz User

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://randomuser.me/api/?results=100'; // URL de la API con 100 resultados

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }
}
