import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Result } from '../models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  originalUsers: Result[] = [];
  users: Result[] = [];
  zebraStyle: boolean = false;
  sortAscending: boolean = true;
  errorMessage: string = '';
  filterCountry: string = '';
  currentSortColumn: string | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchUsers().subscribe({
      next: (data) => {
        this.originalUsers = data.results;
        this.users = [...this.originalUsers];
      },
      error: (error) => {
        console.error('Error fetching data: ', error);
        this.errorMessage = 'Unable to load users. Please try again later.';
      }
    });
  }

  toggleZebraStyle() {
    this.zebraStyle = !this.zebraStyle;
  }

  deleteUser(uuid: string) {
    this.users = this.users.filter(user => user.login.uuid !== uuid);
  }

  restoreOriginalState() {
    this.users = [...this.originalUsers];
    this.applySortingAndFiltering();
  }

  applyFilter() {
    this.applySortingAndFiltering();
  }

  clearFilter() {
    this.filterCountry = '';
    this.applySortingAndFiltering();
  }

  onSort(column: string) {
    if (this.currentSortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.currentSortColumn = column;
      this.sortAscending = true;
    }
    this.applySortingAndFiltering();
  }

  private applySortingAndFiltering() {
    this.users = [...this.originalUsers]
      .filter(user => !this.filterCountry || user.location.country.toLowerCase().includes(this.filterCountry.toLowerCase()))
      .sort((a, b) => {
        const keyA = this.currentSortColumn ? this.resolveNestedProperty(a, this.currentSortColumn) : '';
        const keyB = this.currentSortColumn ? this.resolveNestedProperty(b, this.currentSortColumn) : '';
        return this.sortAscending ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA);
      });
  }

  private resolveNestedProperty(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

}
