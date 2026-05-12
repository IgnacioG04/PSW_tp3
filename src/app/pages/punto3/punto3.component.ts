import { Component } from '@angular/core';
import { Carta } from '../../models/carta.model';

@Component({
  selector: 'app-punto3',
  templateUrl: './punto3.component.html',
  styleUrls: ['./punto3.component.css']
})
export class Punto3Component {

  cartaTapada = 'https://picsum.photos/seed/tapada/200/200?grayscale';

  tablero: Carta[] = [];
  juegoIniciado = false;
  puedeVoltear = false;
  seleccionadas: Carta[] = [];
  intentosRestantes = 10;
  victoria = false;
  derrota = false;

  iniciar(): void {
    this.tablero = this.generarTablero();
    this.intentosRestantes = 10;
    this.juegoIniciado = true;
    this.puedeVoltear = false;
    this.seleccionadas = [];
    this.victoria = false;
    this.derrota = false;
  }

  reiniciar(): void {
    this.iniciar();
  }

  intentar(): void {
    if (this.juegoIniciado && this.intentosRestantes > 0 && !this.victoria && !this.derrota) {
      this.puedeVoltear = true;
      this.seleccionadas = [];
    }
  }

  voltear(carta: Carta): void {
    if (!this.puedeVoltear) return;
    if (carta.descubierta || carta.volteada) return;
    if (this.seleccionadas.length >= 2) return;

    carta.volteada = true;
    this.seleccionadas.push(carta);

    if (this.seleccionadas.length === 2) {
      this.puedeVoltear = false;
      setTimeout(() => this.evaluarPar(), 800);
    }
  }

  private evaluarPar(): void {
    const [a, b] = this.seleccionadas;
    if (a.valor === b.valor) {
      a.descubierta = true;
      b.descubierta = true;
    } else {
      a.volteada = false;
      b.volteada = false;
      this.intentosRestantes--;
    }
    this.seleccionadas = [];

    if (this.tablero.every(c => c.descubierta)) {
      this.victoria = true;
    } else if (this.intentosRestantes <= 0) {
      this.derrota = true;
    }
  }

  private generarTablero(): Carta[] {
    const pares: Carta[] = [];
    for (let v = 1; v <= 6; v++) {
      for (let k = 0; k < 2; k++) {
        pares.push({
          id: pares.length,
          valor: v,
          img: `https://picsum.photos/seed/par${v}/200/200`,
          descubierta: false,
          volteada: false
        });
      }
    }
    for (let i = pares.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pares[i], pares[j]] = [pares[j], pares[i]];
    }
    return pares;
  }
}
