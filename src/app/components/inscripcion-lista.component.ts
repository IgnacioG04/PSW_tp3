import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { InscripcionService } from '../services/inscripcion.service';
import { Inscripcion } from '../models/inscripcion.model';

@Component({
  selector: 'app-inscripcion-lista',
  templateUrl: './inscripcion-lista.component.html'
})
export class InscripcionListaComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective) dtElement?: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  private cambiosSub?: Subscription;

  constructor(public servicio: InscripcionService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros',
        info: 'Mostrando _START_ a _END_ de _TOTAL_',
        infoEmpty: 'Sin registros',
        zeroRecords: 'No hay coincidencias',
        paginate: { first: '<<', last: '>>', next: '>', previous: '<' }
      }
    };

    this.cambiosSub = this.servicio.cambios$.subscribe(() => this.refrescarTabla());
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.cambiosSub?.unsubscribe();
  }

  private refrescarTabla(): void {
    this.dtElement?.dtInstance.then(dt => {
      dt.destroy();
      setTimeout(() => this.dtTrigger.next(this.dtOptions), 0);
    });
  }

  editar(item: Inscripcion, indice: number): void {
    const nuevoPrecio = prompt('Nuevo precio del curso:', String(item.precio));
    if (nuevoPrecio === null) return;
    const precio = parseFloat(nuevoPrecio);
    if (isNaN(precio) || precio <= 0) {
      alert('Precio inválido.');
      return;
    }
    let porcentaje = 0;
    if (item.categoriaAlumno == 1) porcentaje = 0.35;
    else if (item.categoriaAlumno == 2) porcentaje = 0.50;
    this.servicio.actualizarInscripcion(indice, {
      precio,
      totalConDescuento: precio - (precio * porcentaje)
    });
  }

  eliminar(indice: number): void {
    if (confirm('¿Eliminar esta inscripción?')) {
      this.servicio.eliminarInscripcion(indice);
    }
  }
}
