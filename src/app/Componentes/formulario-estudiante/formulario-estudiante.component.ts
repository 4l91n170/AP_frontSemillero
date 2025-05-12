import { Component, inject, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { ServiceEstudianteService } from '../../Servicios/service-estudiante.service';
import { datosEstudiantes } from '../../Models/datos.model';

@Component({
  selector: 'app-formulario-estudiante',
  standalone: false, 
  templateUrl: './formulario-estudiante.component.html',
  styleUrl: './formulario-estudiante.component.css'
})
export class FormularioEstudianteComponent implements OnInit { 
  formularioEstudiante: FormGroup;
  private _serviceEstudianteService = inject(ServiceEstudianteService)
  storeId: any
  constructor(
    private http: HttpClient, 
    private form: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router         
  ) {
    this.formularioEstudiante = this.form.group({
      cedulaEstudiante: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {

    const urlSegments = window.location.pathname.split('/');
    const idQr = urlSegments[1]; // Esto obtiene "12345" en /12345

    if (idQr) {
      localStorage.setItem('estudianteIdDesdeURL', idQr);
      this.router.navigate(['/'], { replaceUrl: true }); 
    } else {
      // Aquí verificamos si ya existe 'estudianteIdDesdeURL' en localStorage
      this.storeId = localStorage.getItem('estudianteIdDesdeURL');
      if (this.storeId) {

      }
    }
  }


  error(controlname: string, errortype: string) {
    return this.formularioEstudiante.get(controlname)?.hasError(errortype) && this.formularioEstudiante.get(controlname)?.touched;
  }
  datosEnviadosEstudiante?: datosEstudiantes 
  onSubmit() {
    if (this.formularioEstudiante.valid) {
      this.datosEnviadosEstudiante = this.formularioEstudiante.value
      this.datosEnviadosEstudiante!.idQr = localStorage.getItem('estudianteIdDesdeURL');
      
      this._serviceEstudianteService.postEnviarDatos(this.datosEnviadosEstudiante).subscribe({
        
      next: (response: {code: number; message:string; data: datosEstudiantes}) => {
        alert("Datos enviados correctamente")
      },
      error: (error) => {
        console.error('Error al enviar datos:', error);
      }
    });
    } else {
      this.formularioEstudiante.markAllAsTouched();
      alert("Por favor llene los datos") // Marcar todos los campos como tocados para mostrar errores
    }
  }

}