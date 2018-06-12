import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent {

  usuario: Object = {
    nombre: 'Matias',
    apellido: 'Figueredo',
    correo: '',
    pais: '',
    sexo: 'Masculino',
    acepta: false
  };

  paises = [{
    codigo: 'AR',
    nombre: 'Argentina'
  }, {
    codigo: 'ESP',
    nombre: 'España'
  }, {
    codigo: 'CR',
    nombre: 'Costa Rica'
  }];

  sexos: ['Masculino', 'Femenino'];

  constructor() { }

  guardar( forma: NgForm ) {
    console.log('Formulario Posteado');
    console.log(' ngForm ', forma);
    console.log('Valor Forma:', forma.value);
    console.log('Usuario', this.usuario);
  }

}
