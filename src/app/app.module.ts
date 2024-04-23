import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //este
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule y Routes
import { AppComponent } from './app.component';

// Configuración de rutas básica (vacía)
const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //este
    RouterModule.forRoot(routes), // Importa RouterModule y configura las rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }