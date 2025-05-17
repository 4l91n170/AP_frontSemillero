import { Component, inject, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { ServiceEstudianteService } from '../../Servicios/service-estudiante.service';
import { datosEstudiantes } from '../../Models/datos.model';
import { PopupService, PopupType } from '../../Servicios/service-popup.service';

@Component({
  selector: 'app-formulario-estudiante',
  standalone: false, 
  templateUrl: './formulario-estudiante.component.html',
  styleUrl: './formulario-estudiante.component.css'
})
export class FormularioEstudianteComponent implements OnInit { 
  formularioEstudiante: FormGroup;
  private _serviceEstudianteService = inject(ServiceEstudianteService);
  private _popupService = inject(PopupService);
  storeId: any;
  
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
idQr: string | null = null;
  ngOnInit(): void {
this.route.paramMap.subscribe(params => {
      this.idQr = params.get('idQr');
      
      // Guardar en localStorage solo si el idQr está presente
      if (this.idQr) {
        localStorage.setItem('estudianteIdDesdeURL', this.idQr);
      } else {
        // Si no hay idQr en la URL, intentar recuperarlo del localStorage
        this.idQr = localStorage.getItem('estudianteIdDesdeURL');
      }
     })
  }
  
  error(controlname: string, errortype: string) {
    return this.formularioEstudiante.get(controlname)?.hasError(errortype) && this.formularioEstudiante.get(controlname)?.touched;
  }
  
  datosEnviadosEstudiante?: datosEstudiantes 
  
  onSubmit() {
    if (this.formularioEstudiante.valid) {
      this.datosEnviadosEstudiante = this.formularioEstudiante.value;
      this.datosEnviadosEstudiante!.idQr = localStorage.getItem('estudianteIdDesdeURL');
      
      this._serviceEstudianteService.postEnviarDatos(this.datosEnviadosEstudiante).subscribe({
        next: (response: {code: number; message:string; data: datosEstudiantes}) => {
          // Mostrar popup de éxito
          this._popupService.showSuccessPopup("Asistencia registrada correctamente");
        },
        error: (error) => {
          console.error('Error al enviar datos:', error);
          // Mostrar popup de error
          this._popupService.showErrorPopup("Error al enviar los datos: " + "Intente nuevamente");
        }
      });
    } else {
      this.formularioEstudiante.markAllAsTouched();
      // Mostrar popup de alerta para datos incompletos
      this._popupService.showAlertPopup("Por favor llene todos los datos requeridos");
    }
  }
}