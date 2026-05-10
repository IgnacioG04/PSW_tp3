import { Component, OnInit } from '@angular/core';
import { InscripcionService } from '../services/inscripcion.service';

@Component({
  selector: 'app-inscripcion-lista',
  templateUrl: './inscripcion_lista.html',
  styleUrls: []
})
export class InscripcionListaComponent implements OnInit {

  constructor(public servicio: InscripcionService) { }

  ngOnInit(): void {
  }

}
