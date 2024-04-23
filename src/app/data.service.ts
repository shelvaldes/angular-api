import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://randomuser.me/api/?results=100'; // URL de la API con 100 resultados

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}