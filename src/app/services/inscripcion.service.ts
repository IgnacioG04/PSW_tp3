import { Injectable } from '@angular/core';
import { Inscripcion } from '../models/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private _inscripciones: Inscripcion[] = [];

  constructor() { }

  // obtener las inscripciones
  getInscripciones(): Inscripcion[] {
    return this._inscripciones;
  }

  // cargar una nueva inscripcion
  agregarInscripcion(inscripcion: Inscripcion) {
    this._inscripciones.push({
      ...inscripcion,
      fechaInscripcion: new Date()
    });
  }

  // resumen solicitado
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
