import { Component } from '@angular/core';
import { InscripcionService } from '../services/inscripcion.service';
import { Inscripcion } from '../models/inscripcion.model';

@Component({
  selector: 'app-inscripcion-form',
  templateUrl: './inscripcion_form.html'
})
export class InscripcionFormComponent {

  // objeto para el binding del formulario
  nuevaInscripcion: Inscripcion = {
    dni: '',
    precio: 0,
    categoriaAlumno: 0,
    fechaInscripcion: new Date(),
    email: '',
    curso: '',
    totalConDescuento: 0
  };

  constructor(private servicio: InscripcionService) { }

  // este metodo se llama cada vez que cambia el precio o el tipo de alumno
  calcularTotal() {
    let porcentaje = 0;

    if (this.nuevaInscripcion.categoriaAlumno == 1) {
      porcentaje = 0.35; // descuento para estudiante
    } else if (this.nuevaInscripcion.categoriaAlumno == 2) {
      porcentaje = 0.50; // descuento para egresado
    } else {
      porcentaje = 0; // Particular sin descuento
    }

    // calculo total
    this.nuevaInscripcion.totalConDescuento = 
      this.nuevaInscripcion.precio - (this.nuevaInscripcion.precio * porcentaje);
  }

  // funcion registrar
  registrar() {
    if (this.nuevaInscripcion.dni !== '' && this.nuevaInscripcion.precio > 0) {
      
      // enviamos el objeto al servicio
      this.servicio.agregarInscripcion(this.nuevaInscripcion);
      
      // limpiar el form
      this.nuevaInscripcion = {
        dni: '', precio: 0, categoriaAlumno: 0, 
        fechaInscripcion: new Date(), email: '', curso: '', totalConDescuento: 0
      };
      
      alert('Inscripción guardada correctamente.');
    } else {
      alert('Faltan completar datos en el formulario.');
    }
  }
}