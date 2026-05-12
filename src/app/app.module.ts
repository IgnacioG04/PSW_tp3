import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InscripcionFormComponent } from './components/inscripcion-form.component';
import { InscripcionListaComponent } from './components/inscripcion-lista.component';

import { Punto1Component } from './pages/punto1/punto1.component';
import { Punto2Component } from './pages/punto2/punto2.component';
import { Punto3Component } from './pages/punto3/punto3.component';
import { InscripcionesPageComponent } from './pages/inscripciones-page/inscripciones-page.component';

@NgModule({
  declarations: [
    AppComponent,
    InscripcionFormComponent,
    InscripcionListaComponent,
    Punto1Component,
    Punto2Component,
    Punto3Component,
    InscripcionesPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
