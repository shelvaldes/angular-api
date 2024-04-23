// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];

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
}
