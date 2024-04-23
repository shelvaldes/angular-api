// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Result } from '../models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  originalUsers: Result[] = [];  // Array para almacenar los datos originales
  users: Result[] = [];  // Array para mostrar y manipular los datos
  zebraStyle: boolean = false;  // Estado para el estilo cebra
  sortAscending: boolean = true; // estado para controlar la dirección del ordenamiento
  errorMessage: string = '';  // Mensaje de error
  filterCountry: string = '';  // Propiedad para el input del filtro


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchUsers().subscribe({
      next: (data) => {
        this.originalUsers = data.results;  // Almacenar los datos originales
        this.users = [...this.originalUsers];  // Copiar los datos originales a users
        console.log(this.users);  // Ver los datos en la consola
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
        this.errorMessage = error;  // Error se muestra al usuario
      }
    });
  }

  toggleZebraStyle() {
    this.zebraStyle = !this.zebraStyle;  // Cambia el estado del estilo cebra
  }

  toggleSortByCountry() {
    this.sortAscending = !this.sortAscending;
    this.users.sort((a, b) => {
      if (a.location.country < b.location.country) {
        return this.sortAscending ? -1 : 1;
      }
      if (a.location.country > b.location.country) {
        return this.sortAscending ? 1 : -1;
      }
      return 0;
    });
  }

  deleteUser(uuid: string) {
    this.users = this.users.filter(user => user.login.uuid !== uuid);
  }

  restoreOriginalState() {
    this.users = [...this.originalUsers];  // Restaurar los datos originales
  }

  applyFilter() {
    if (!this.filterCountry) {
      this.users = [...this.originalUsers];  // Sin filtro, mostrar todos los usuarios
    } else {
      this.users = this.originalUsers.filter(user =>
        user.location.country.toLowerCase().includes(this.filterCountry.toLowerCase())
      );
    }
  }

  clearFilter() {
    this.filterCountry = '';
    this.users = [...this.originalUsers];  // Restaurar el estado original sin filtro
  }

  ngDoCheck() {
    console.log(this.filterCountry); // Esto imprimirá el valor cada vez que Angular realice una detección de cambios
  }

}
