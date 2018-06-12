import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  usuario: any = {
    nombreCompleto: {
      nombre: 'Matias',
      apellido: 'Figueredo'
    },
    correo: 'matias.figueredo@gmail.com',
    pasatiempos: ['Correr', 'Dormir', 'Comer']
  };

  constructor() {

    console.log(this.usuario);

    this.forma = new FormGroup({

      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('' , [Validators.required, Validators.minLength(3) ]),
        'apellido': new FormControl('' , [Validators.required, this.noHerrera]),
      }),
      // FormControl recibe dos parametros, el 1ro es el valor por defecto, el segundo son las reglas de validacion
      // 'nombre': new FormControl('' , [Validators.required, Validators.minLength(3) ]),
      // 'apellido': new FormControl('' , Validators.required),
      'correo': new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(),
    });

    // puedo especificar un solo validador o un arreglo de ellos
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma )
    ]);

    // this.forma.setValue( this.usuario );

    // esto escucha todos los cambios que se hacen sobre la variable forma
    this.forma.valueChanges.subscribe( data => { console.log(data); });

    // esto escucha un cambio particular dentro de la variable forma
    this.forma.controls['username'].valueChanges.subscribe( data => { console.log(data); });

    // podemos suscribirnos para ver el status de forma
    this.forma.controls['username'].statusChanges.subscribe( data => { console.log(data); });

  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noHerrera( control: FormControl ): { [s: string]: boolean } {
    if ( control.value === 'herrera') {
      return {
        noherrera: true
      };
    }
    return null;
  }

  noIgual( control: FormControl ): { [s: string]: boolean } {

    let forma: any = this;

    // verifico que el valor sea igual a password1
    if ( control.value !== forma.controls['password1'].value ) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  existeUsuario( control: FormControl ): Promise<any> | Observable<any> {

    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout( () => {
          if ( control.value === 'strider' ) {
            resolve( { existe: true } );
          } else {
            resolve ( null );
          }
        }, 3000 );
      }
    );
    return promesa;
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

    // this.forma.reset( this.usuario );

    // this.forma.controls['correo'].setValue('correo@correo.com');
    // this.forma.controls['nombreCompleto'].controls['nombre'].setValue('Agustin');

    // this.forma.reset({
    //   nombreCompleto: {
    //     nombre: '',
    //     apellido: ''
    //   },
    //   correo: ''
    // });
  }

}
