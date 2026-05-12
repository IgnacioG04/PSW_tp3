import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private _inscripciones: Inscripcion[] = [];

  cambios$ = new Subject<void>();

  getInscripciones(): Inscripcion[] {
    return this._inscripciones;
  }

  agregarInscripcion(inscripcion: Inscripcion): void {
    this._inscripciones.push({
      ...inscripcion,
      fechaInscripcion: new Date()
    });
    this.cambios$.next();
  }

  actualizarInscripcion(indice: number, datos: Partial<Inscripcion>): void {
    if (indice >= 0 && indice < this._inscripciones.length) {
      this._inscripciones[indice] = {
        ...this._inscripciones[indice],
        ...datos
      };
      this.cambios$.next();
    }
  }

  eliminarInscripcion(indice: number): void {
    if (indice >= 0 && indice < this._inscripciones.length) {
      this._inscripciones.splice(indice, 1);
      this.cambios$.next();
    }
  }

  getResumen() {
    const resumen = {
      estudiantes: 0,
      egresados: 0,
      particulares: 0,
      totalRecaudado: 0
    };

    this._inscripciones.forEach(i => {
      resumen.totalRecaudado += i.totalConDescuento;
      if (i.categoriaAlumno == 1) resumen.estudiantes++;
      if (i.categoriaAlumno == 2) resumen.egresados++;
      if (i.categoriaAlumno == 3) resumen.particulares++;
    });

    return resumen;
  }
}
