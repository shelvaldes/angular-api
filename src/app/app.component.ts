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
  users: Result[] = [];
  zebraStyle: boolean = false;  // Estado para el estilo cebra


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchUsers().subscribe({
      next: (data) => {
        this.users = data.results;
        console.log(this.users);  // Ver los datos en la consola
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
      }
    });
  }

  toggleZebraStyle() {
    this.zebraStyle = !this.zebraStyle;  // Cambia el estado del estilo cebra
  }

}
