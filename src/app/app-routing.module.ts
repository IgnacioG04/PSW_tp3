import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Punto1Component } from './pages/punto1/punto1.component';
import { Punto2Component } from './pages/punto2/punto2.component';
import { Punto3Component } from './pages/punto3/punto3.component';
import { InscripcionesPageComponent } from './pages/inscripciones-page/inscripciones-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'punto1', pathMatch: 'full' },
  { path: 'punto1', component: Punto1Component },
  { path: 'punto2', component: Punto2Component },
  { path: 'punto3', component: Punto3Component },
  { path: 'inscripciones', component: InscripcionesPageComponent },
  { path: '**', redirectTo: 'punto1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
