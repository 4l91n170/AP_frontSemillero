import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-estudiante',
  standalone: false,
  templateUrl: './formulario-estudiante.component.html',
  styleUrl: './formulario-estudiante.component.css'
})
export class FormularioEstudianteComponent {
  formularioEstudiante: FormGroup
  constructor(private form: FormBuilder){this.formularioEstudiante = this.form.group({
    cedula: ['', Validators.required],
    
   })}
   error(controlname:string, errortype: string){
    return this.formularioEstudiante.get(controlname)?.hasError(errortype)&& this.formularioEstudiante.get(controlname)?.touched
    }
    onSumbit(){
      if(this.formularioEstudiante.valid){
  
      }
    }
}
