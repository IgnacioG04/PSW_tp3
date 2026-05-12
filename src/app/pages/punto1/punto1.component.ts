import { Component } from '@angular/core';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.component.html',
  styleUrls: ['./punto1.component.css']
})
export class Punto1Component {

  eventos: Evento[] = [
    {
      nombre: 'Hackathon UTN',
      descripcion: '24 horas de programación en equipo con premios para los mejores proyectos.',
      img: 'https://picsum.photos/seed/evento01/800/400'
    },
    {
      nombre: 'Charla Angular 17',
      descripcion: 'Novedades de la última versión, signals y standalone components.',
      img: 'https://picsum.photos/seed/evento02/800/400'
    },
    {
      nombre: 'Workshop UX/UI',
      descripcion: 'Diseño de interfaces accesibles y centradas en el usuario.',
      img: 'https://picsum.photos/seed/evento03/800/400'
    },
    {
      nombre: 'Expo Egresados',
      descripcion: 'Presentación de proyectos finales de la última cohorte.',
      img: 'https://picsum.photos/seed/evento04/800/400'
    }
  ];

  indiceActual = 0;

  anterior(): void {
    this.indiceActual = (this.indiceActual - 1 + this.eventos.length) % this.eventos.length;
  }

  siguiente(): void {
    this.indiceActual = (this.indiceActual + 1) % this.eventos.length;
  }

  get eventoActual(): Evento {
    return this.eventos[this.indiceActual];
  }
}
