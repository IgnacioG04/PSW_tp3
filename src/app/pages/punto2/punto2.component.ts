import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-punto2',
  templateUrl: './punto2.component.html',
  styleUrls: ['./punto2.component.css']
})
export class Punto2Component {

  productos: Producto[] = [
    { nombre: 'Notebook Asus 13"', descripcion: 'Disco 40GB, 15 pulgadas',     img: 'https://picsum.photos/seed/prod01/400/300', precio: 1200 },
    { nombre: 'Monitor LG 14"',    descripcion: 'Resolución FullHD HDMI',       img: 'https://picsum.photos/seed/prod02/400/300', precio: 99 },
    { nombre: 'Teclado Mecánico',  descripcion: 'Switches RGB con iluminación', img: 'https://picsum.photos/seed/prod03/400/300', precio: 90 },
    { nombre: 'Mouse Inalámbrico', descripcion: 'Ergonómico con 6 botones',     img: 'https://picsum.photos/seed/prod04/400/300', precio: 25 },
    { nombre: 'Auriculares NC',    descripcion: 'Cancelación activa de ruido',  img: 'https://picsum.photos/seed/prod05/400/300', precio: 150 },
    { nombre: 'Webcam HD',         descripcion: '1080p con micrófono integrado',img: 'https://picsum.photos/seed/prod06/400/300', precio: 60 }
  ];

  arraycarrito: ItemCarrito[] = [];

  agregarAlCarrito(producto: Producto): void {
    const existente = this.arraycarrito.find(i => i.producto.nombre === producto.nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      this.arraycarrito.push({ producto, cantidad: 1 });
    }
  }

  incrementar(item: ItemCarrito): void {
    item.cantidad++;
  }

  decrementar(item: ItemCarrito): void {
    item.cantidad--;
    if (item.cantidad <= 0) {
      this.quitarDelCarrito(item);
    }
  }

  quitarDelCarrito(item: ItemCarrito): void {
    const indice = this.arraycarrito.indexOf(item);
    if (indice >= 0) {
      this.arraycarrito.splice(indice, 1);
    }
  }

  get cantidadTotal(): number {
    return this.arraycarrito.reduce((acc, i) => acc + i.cantidad, 0);
  }

  get total(): number {
    return this.arraycarrito.reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0);
  }

  checkOut(): void {
    alert('Compra realizada. Total a abonar: $' + this.total.toFixed(2));
    this.arraycarrito = [];
  }
}
