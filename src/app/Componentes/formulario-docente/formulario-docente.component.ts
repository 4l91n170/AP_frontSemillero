import { Component, inject, OnInit } from '@angular/core';
import { ServiceDocenteService } from '../../Servicios/service-docente.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Character, Result } from '../../Models/character.model';
import { datosDocente, datosFormularioAsistencia } from '../../Models/datos.model';

@Component({
  selector: 'app-formulario-docente',
  standalone: false,
  templateUrl: './formulario-docente.component.html',
  styleUrl: './formulario-docente.component.css'
})
export class FormularioDocenteComponent implements OnInit {
  // Inyectable del servicio
  private _serviceDocente = inject(ServiceDocenteService);
  
  // Constructor del formulario, contiene los validadores.
  formularioDocente: FormGroup
  constructor(private form: FormBuilder){this.formularioDocente = this.form.group({
    cedula: ['',Validators.required],
    programa: ['',Validators.required],
    asignatura: ['',Validators.required],
   
  })}
  // Funcion error, para que detecte el sitio si esta en blanco con un click o touch
  error(controlname:string, errortype: string){
    return this.formularioDocente.get(controlname)?.hasError(errortype)&& this.formularioDocente.get(controlname)?.touched
  
  }
  
  // funciones API
  Docentelist: datosDocente [] = []
  ngOnInit(): void {
    this._serviceDocente.getDatosFormulario().subscribe((data: datosFormularioAsistencia) =>{
      console.log(data)
      this.Docentelist = data.docentes
    })
  }

 // Funcion del boton
 datosEnviados: datosDocente []= [] 
 onSumbit(){
    if(this.formularioDocente.valid){
      this.datosEnviados = this.formularioDocente.value
      console.log(this.datosEnviados)
      this.formularioDocente.reset()
     
   }
   else{
    alert("por favor inserte los datos")
   }
 }


}
  

